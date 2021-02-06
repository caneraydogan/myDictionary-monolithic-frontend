import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Entry} from '../model/Entry';
import {DataService} from '../dataservice/data-service.component';
import {ResponseBodyStatus} from '../utils/endpoint.types';
import {Meaning} from '../model/Meaning';
import {Usage} from '../model/Usage';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-practice',
    templateUrl: './practice.component.html',
    styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

    id: number;
    language: string;

    @Output() newEntry: EventEmitter<Entry> = new EventEmitter();
    currentEntry = new Entry();
    lastEntry = new Entry();
    missingMeaning = true;
    missingUsage = true;

    filter = {
        get: {
            language: [
                {value: 'EN'},
                {value: 'DE'}
            ],
            artikel: [
                {value: 'der'},
                {value: 'die'},
                {value: 'das'}
            ],
            type: [
                {key: 'Noun', value: 'NOUN'},
                {key: 'Verb', value: 'VERB'}
            ]
        },
        set: {
            checkbox: {
                artikel: false,
                word: false,
                meaning: false,
                usage: false,
                practice: false
            }
        },
        isUpdateClicked: false,
        showPractice: true,
        showDonePractising: false
    };

    constructor(private dataService: DataService,
                private route: ActivatedRoute) {
    }


    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.language = params.get('language');
            this.id = +params.get('id');
        });

        if (this.id !== undefined && this.language !== undefined) {
            this.getEntryById();
        }
    }

    updateEntry() {
        this.removeNullValues();
        this.dataService.updateEntry(this.currentEntry).subscribe(response => {
            if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
            } else if (response.status === ResponseBodyStatus.OK) {
                console.log('Success message:' + response.message);
                this.setUpdate(false);
            }
        });
    }

    deleteEntry() {
        this.dataService.deleteEntry(this.currentEntry).subscribe(response => {
            if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
            } else if (response.status === ResponseBodyStatus.OK) {
                console.log('Success message:' + response.message);
                this.setUpdate(false);
                this.getRandomEntry();
            }
        });
    }


    removeNullValues() {
        this.currentEntry.meaningList = this.currentEntry.meaningList.filter(item => item.value !== null && item.value.trim() !== '');
        this.currentEntry.usageList = this.currentEntry.usageList.filter(item => item.value !== null && item.value.trim() !== '');
    }

    getRandomEntry() {
        this.dataService.getRandomEntry(AuthenticationService.getUserUUId(), this.currentEntry.language, this.filter.showDonePractising).subscribe(response => {
            if (response.status === ResponseBodyStatus.OK) {
                this.lastEntry = this.currentEntry;
                const language = this.currentEntry.language;
                this.currentEntry = response.data;
                this.currentEntry.language = language;
                this.setUpdate(false);
                this.currentEntry.userUUId = AuthenticationService.getUserUUId();
            } else if (response.status === ResponseBodyStatus.FAIL) {
                alert(response.message);
                console.log('Error code:' + response.errorCode);
                console.log('Error message:' + response.message);
            }
        });
    }

    getEntryById() {
        this.dataService.getEntryById(this.language, this.id).subscribe(response => {
            if (response.status === ResponseBodyStatus.OK) {
                this.currentEntry = response.data;
                this.currentEntry.language = this.language;
                this.currentEntry.userUUId = AuthenticationService.getUserUUId();
                this.setUpdate(true);
                this.setCheckboxes();
            } else if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
                console.log('Error message:' + response.message);
            }
        });
    }

    private setCheckboxes() {
        this.filter.set.checkbox.artikel = this.language === 'DE';
        this.filter.set.checkbox.word = true;
        this.filter.set.checkbox.meaning = true;
        this.filter.set.checkbox.usage = true;
    }

    clearFields() {
        this.lastEntry = this.currentEntry;
        this.currentEntry = new Entry();
    }

    setUpdate(value: boolean) {
        this.filter.isUpdateClicked = value;
    }

    isArtikelValid(candidate: string): boolean {
        // tslint:disable-next-line:triple-equals
        if (this.currentEntry.language === 'EN' || candidate == undefined) {
            return true;
        } else {
            for (const artikel of this.filter.get.artikel) {
                if (candidate.toUpperCase() === artikel.value.toUpperCase()) {
                    return true;
                }
            }
        }
        return false;
    }

    isEntryValid(): boolean {
        this.checkRequiredFields();
        return !this.missingMeaning && !this.missingUsage && this.isArtikelValid(this.currentEntry.artikel);
    }

    checkRequiredFields() {
        if (this.currentEntry.word == null || this.currentEntry.word.trim() === '') {
            return;
        }
        this.missingMeaning = true;
        this.missingUsage = true;
        for (const u of this.currentEntry.usageList) {
            if (u.value != null && u.value.trim() !== '') {
                this.missingMeaning = false;
                break;
            }
        }

        for (const u of this.currentEntry.meaningList) {
            if (u.value != null && u.value.trim() !== '') {
                this.missingUsage = false;
                break;
            }
        }
    }

    addMeaning() {
        this.currentEntry.meaningList.push(new Meaning());
    }

    addUsage() {
        this.currentEntry.usageList.push(new Usage());
    }

    deleteMeaning(meaningId: number) {
        this.currentEntry.meaningList = this.currentEntry.meaningList.filter(item => item.id !== meaningId);
    }

    deleteUsage(usageId: number) {
        this.currentEntry.usageList = this.currentEntry.usageList.filter(item => item.id !== usageId);
    }

    updatePractice() {
        this.dataService.updatePractice(this.currentEntry).subscribe(response => {
            if (response.status === ResponseBodyStatus.OK) {
            } else if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
                console.log('Error message:' + response.message);
            }
        });
    }

    clickShowPractiseButton() {
        this.filter.showPractice = true;
        this.filter.showDonePractising = false;
    }

    clickShowDonePractisingButton() {
        this.filter.showDonePractising = true;
        this.filter.showPractice = false;
    }
}
