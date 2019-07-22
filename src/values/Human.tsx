import { SemanticCOLORS } from "semantic-ui-react";
import faker from 'faker';
import photoService from '../services/PhotoService';
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

function pick<T>(...elems: T[]) {
    let idx = Math.floor(Math.random()*elems.length);
    return elems[idx];
}

export interface Event {
    creatorId: number;
    id: number
    icon: SemanticICONS
    name: string
    description: string
    keywords: string[]
    createdAt: Date
}

export class LifeEvent implements Event {
    public static count:number = 0;
    public id: number;
    public createdAt: Date; // = new Date();
    constructor(public creatorId: number, public name: string, public description: string, public icon: SemanticICONS, public keywords: string[]) {
        this.id = LifeEvent.count++
        this.createdAt = new Date()
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
        this.activities = [] //Array.from({length:25}, this.genEvent)
        this.quote = faker.hacker.phrase();
        this.job = faker.name.jobTitle()
    }
    genEvent = (): LifeEvent => {
        let name = 'something happened'
        let description = 'it was okay'
        let keywords: string[] = [ ]

        let icon: SemanticICONS = pick('food', 'favorite', 'music', 'map')
        if (icon === 'food') {
            name = 'i ate ' + pick('breakfast', 'lunch', 'dinner', 'a snack')
            description = pick(
                'it was really good actually',
                "i could've had something else",
                "i didn't mind it?",
                "could've been more tasty",
                "was actually delicious"
            )
            keywords.push('food')
        } else if (icon === 'music') {
            name = pick('played some tunes', 'jammed out', 'listened to music', 'drove around and rocked out')
            description = pick("i should learn to play", "alright it sounded pretty good", "you know how we do this")
            keywords.push('music')
        } else if (icon === 'favorite') { // fav
            console.log('---> event', { icon })
            name = pick(
                'Got an award',
                'Made the team',
                'Achieved the goal',
            )
            description = pick(
                "i'm just glad to be here",
                "life is good, you know?",
                "it's alright!",
                "it feels fantastic",
                "i can't actually describe it all too well, but you know"
            )
            keywords.push('team')
        } else if (icon === 'map') {
            name = "Arrived at " + pick('School', 'Work', 'Home', 'Church', 'the Mall')
            description = pick("Unremarkable")
            keywords.push('travel')
        }
        return new LifeEvent(this.id, name, description, icon, keywords)
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