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
        this.setTableColumns();
    }

    setTableColumns() {
            this.tableColumns = ['artikel', 'word', 'meaning', 'usage', 'actions'];

    }

    getEntries() {
        this.setTableColumns();
        this.dataService.getEntries(AuthenticationService.getUserUUId(), this.filter.showDonePractising).subscribe(response => {
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
        this.dataService.searchByWord(AuthenticationService.getUserUUId(), this.filter.searchValue).subscribe(response => {
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
        this.router.navigate(['practice', currentEntry.id], {skipLocationChange: true});
    }
}
