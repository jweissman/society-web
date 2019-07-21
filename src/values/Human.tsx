import { SemanticCOLORS } from "semantic-ui-react";
import faker from 'faker';
import photoService from '../services/PhotoService';
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

function pick<T>(...elems: T[]) {
    let idx = Math.floor(Math.random()*elems.length);
    return elems[idx];
}

export interface Event {
    id: number
    icon: SemanticICONS
    name: string
    description: string
}

class LifeEvent implements Event {
    id: number;
    static count:number = 0;
    constructor(public name: string, public description: string, public icon: SemanticICONS) {
        this.id = LifeEvent.count++
        console.log("EVT", this.id, this.name, this.description)
    }
}

export default class Human {
    static count: number = 0;
    public photoUrl?: string;
    public quote?: string;
    public job?: string;
    public friends: number[] = []
    public id: number;
    public activities: Event[] = []
    public favoriteColor: "red" | "orange" | "yellow" | "olive" | "green" | "teal" | "blue" | "violet" | "purple" | "pink" | "brown" | "grey" | "black" | undefined;

    constructor(public name: string, public gender: 'male' | 'female', public about: string) {
        this.id = Human.count++;
        let colors: SemanticCOLORS[] = [ "red", "orange", "green", "yellow", "olive", "teal", "violet", "pink", "blue" ];
        this.favoriteColor = colors[Math.floor(Math.random()*colors.length)]
        this.activities = Array.from({length:10}, this.genEvent)
        this.quote = faker.hacker.phrase();
        this.job = faker.name.jobTitle()
    }
    genEvent(): LifeEvent {
        let name = 'something happened'
        let description = 'it was okay'

        let icon: SemanticICONS = pick('food', 'favorite', 'music')
        if (icon === 'food') {
            name = 'i ate ' + pick('breakfast', 'lunch', 'dinner', 'a snack')
            description = 'it was really good actually'
        } else if (icon === 'music') {
            name = pick('played some tunes', 'jammed out')
            description = pick("i should learn to play", "alright it sounded pretty good")
        } else { // fav
            console.log('---> event', { icon })
            name = 'something great happened'
            description = "i can't actually describe it all too well, but you know"
        }
        return new LifeEvent(name, description, icon)
    }
    async findGoodPicture() {
        let keywords = [ 'face', 'person' ]
        if (Math.random() < 0.2) {
            if (this.gender === 'male') {
                keywords.push('man')
            } else {
                keywords.push('woman')
            }
        } else {
            keywords.push(this.gender)
        }
        this.photoUrl = await photoService.findPhoto(...keywords)
    }

    addFriend(other: Human, shouldReflect: boolean = true) {
        this.friends.push(other.id)
        if (shouldReflect) {
            other.addFriend(this, false)
        }
    }
}