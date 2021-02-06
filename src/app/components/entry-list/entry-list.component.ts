import {Component, OnInit} from '@angular/core';
import {DataService} from '../dataservice/data-service.component';
import {ResponseBodyStatus} from '../utils/endpoint.types';
import {Router} from '@angular/router';
import {Entry} from '../model/Entry';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

    public filter = {
        get: {
            language: [
                {value: 'EN'},
                {value: 'DE'}
            ]
        },
        set: {
            language: ''
        },
        showPractice: true,
        showDonePractising: false,
        searchValue: ''
    };
    dataSource = [];
    tableColumns: string[];

    constructor(private dataService: DataService,
                private router: Router) {
    }


    ngOnInit() {
        this.filter.set.language = 'EN';
        this.setTableColumns();
    }

    setTableColumns() {
        if (this.filter.set.language === 'DE') {
            this.tableColumns = ['artikel', 'word', 'meaning', 'usage', 'actions'];
        } else if (this.filter.set.language === 'EN') {
            this.tableColumns = ['word', 'meaning', 'usage', 'actions'];
        }
    }

    getEntries() {
        this.setTableColumns();
        this.dataService.getEntries(AuthenticationService.getUserUUId(), this.filter.set.language, this.filter.showDonePractising).subscribe(response => {
            if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
                console.log('Error message:' + response.message);
            } else if (response.status === ResponseBodyStatus.OK) {
                console.log('Success message:' + response.message);
                this.dataSource = response.data;
            }
        });
    }

    deleteEntry(currentEntry: Entry) {
        currentEntry.language = this.filter.set.language;
        this.dataService.deleteEntry(currentEntry).subscribe(response => {
            if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
            } else if (response.status === ResponseBodyStatus.OK) {
                console.log('Success message:' + response.message);
                alert('Deleted!');
                this.getEntries();
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

    search() {
        this.setTableColumns();
        this.dataService.searchByWord(AuthenticationService.getUserUUId(), this.filter.set.language, this.filter.searchValue).subscribe(response => {
            if (response.status === ResponseBodyStatus.FAIL) {
                console.log('Error code:' + response.errorCode);
                console.log('Error message:' + response.message);
            } else if (response.status === ResponseBodyStatus.OK) {
                console.log('Success message:' + response.message);
                this.dataSource = response.data;
            }
        });
    }

    updateEntry(currentEntry: Entry) {
        this.router.navigate(['practice', this.filter.set.language, currentEntry.id], {skipLocationChange: true});
    }
}
