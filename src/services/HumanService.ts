import Human from "../values/Human";
import { SemanticICONS } from "semantic-ui-react";
async function asyncForEach<T>(array: Array<T>, callback: (t: T, n: number, arr: Array<T>) => void) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

class HumanDatabase {
    humans: { [id: string]: Human } = {}
    find(id: number) {
        return this.humans[id];
    }
    put(id: number, human: Human) {
        this.humans[id] = human;
    }
    freeze() {
        console.log("FREEZE")
        localStorage.setItem('humans', JSON.stringify(this.humans))
    }
    thaw(): boolean {
        console.log("THAW")
        let humansJson: string | null = localStorage.getItem('humans')
        if (humansJson) {
            this.humans = JSON.parse(humansJson, (k: string, v: any) => {
                if (k === 'createdAt') {
                    return new Date(v);
                }
                return v;
            })
            console.log("THAWED ---> ", { humans: this.humans })
            return true
        }
        return false

    }
    
}

export class HumanService {
    db: HumanDatabase = new HumanDatabase()
    constructor() {
        console.log("Created new humans service!")
    }
    all = () => Object.values(this.db.humans)
    lookup = (id: number) => this.db.find(id)

    async seed(progress: (n: number) => void): Promise<void> {
        if (this.db.thaw()) {
            console.warn("THAWED, skipping seed")
            return
        }
        console.log("SEEDING")
        let pool = {
            dale: new Human("Dale Lingis", 'male', "making it work"),
            tom: new Human("Tom Jones", 'male', "something is gonna happen"),
            albert: new Human("Albert Transfer", 'male', "it's all going to work out"),
            abel: new Human("Abel Don", 'male', "everything is cool"),
            kara: new Human("Kara Teristic", 'female', "the world is okay"),
            //new Human("Ma Bell"),
            essence: new Human("Essence Beauty", 'female', "i like talking to people"),
            velocity: new Human("Velocity Ideas", 'female', "shopping is fun"),
            time: new Human("Time Shine", 'female', "having a good time"),
            life: new Human("Life Cosmos", 'female', "i enjoy chilling out with my friends"),
            sweet: new Human("Sweet Good Omens", 'female', "it's all a game really"),
            x: new Human("Mr. X", 'male', "i'll keep my personal details to myself, thanks"),

        }
        let { tom, albert, dale, abel, kara, essence, velocity, time, life, sweet, x } = pool;
        tom.addFriend(albert)
        tom.addFriend(dale)
        tom.addFriend(sweet)
        sweet.addFriend(x)
        dale.addFriend(abel)
        abel.addFriend(kara)
        kara.addFriend(albert)
        kara.addFriend(essence)
        kara.addFriend(velocity)
        kara.addFriend(time)
        time.addFriend(life)
        time.addFriend(velocity)
        time.addFriend(essence)
        time.addFriend(abel)


        let n = 0;
        await asyncForEach(Object.values(pool), async (human: Human) => {
            this.db.put(human.id, human)
            await human.findGoodPicture()
            n++
            let p = Math.floor(100 * ((n) / Object.entries(pool).length))
            console.log("PROGRESS", p)
            progress(p)
        })
        for (let i=0; i<10; i++) {
            Object.values(pool).forEach((human: Human) => {
                human.activities.push(human.genEvent())
            })
        }
        this.db.freeze()
    }
}

const svc = new HumanService();
export default svc;