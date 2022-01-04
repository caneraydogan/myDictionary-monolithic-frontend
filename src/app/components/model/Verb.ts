import {Meaning} from './Meaning';
import {Usage} from './Usage';
import {AuthenticationService} from '../services/authentication.service';
import {Preposition} from './Preposition';
import {Past} from './Past';

export class Verb {
    id: number;
    userUUId: string;
    word: string;
    meaningList: Array<Meaning> = [];
    usageList: Array<Usage> = [];
    donePracticing: boolean;
    reflexiv: boolean;
    past: Past;
    preposition: Array<Preposition> = [];
    nomen: string;


    constructor() {
        this.id = null;
        this.userUUId = AuthenticationService.getUserUUId();
        this.word = null;
        this.meaningList.push(new Meaning());
        this.usageList.push(new Usage());
        this.donePracticing = null;
        this.reflexiv = null;
        this.past = new Past();
        this.preposition.push(new Preposition());
        this.nomen = null;
    }

}
