import {Meaning} from './Meaning';
import {Usage} from './Usage';
import {AuthenticationService} from '../services/authentication.service';

export class Entry {
    id: number;
    userUUId: string;
    word: string;
    meaningList: Array<Meaning> = [];
    usageList: Array<Usage> = [];
    artikel: string;
    donePracticing: boolean;


    constructor() {
        this.id = null;
        this.userUUId = AuthenticationService.getUserUUId();
        this.word = null;
        this.meaningList.push(new Meaning());
        this.usageList.push(new Usage());
        this.artikel = null;
        this.donePracticing = null;
    }

}
