import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Entry} from '../model/Entry';
import {DataService} from '../dataservice/data-service.component';
import {ResponseBodyStatus} from '../utils/endpoint.types';
import {Meaning} from '../model/Meaning';
import {Usage} from '../model/Usage';

@Component({
  selector: 'app-new-verb',
  templateUrl: './new-verb.component.html',
  styleUrls: ['./new-verb.component.css']
})
export class NewVerbComponent implements OnInit {


  @Output() newEntry: EventEmitter<Entry> = new EventEmitter();
  currentEntry = new Entry();
  lastEntry = new Entry();
  missingMeaning = true;
  missingUsage = true;


  filter = {
    get: {
      artikel: [
        {value: 'der'},
        {value: 'die'},
        {value: 'das'}
      ],
      type: [
        {key: 'Noun', value: 'NOUN'},
        {key: 'Verb', value: 'VERB'}
      ]
    }
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  saveEntry() {
    if (!this.missingMeaning && !this.missingUsage) {
      this.removeNullValues();
      this.dataService.saveEntry(this.currentEntry).subscribe(response => {
        if (response.status === ResponseBodyStatus.FAIL) {
          console.log('Error code:' + response.errorCode);
          alert(response.errorCode);
        } else if (response.status === ResponseBodyStatus.OK) {
          console.log('Success message:' + response.message);
          this.clearFields();
        }
      });
    }
  }

  removeNullValues() {
    this.currentEntry.meaningList = this.currentEntry.meaningList.filter(item => item.value !== null && item.value.trim() !== '');
    this.currentEntry.usageList = this.currentEntry.usageList.filter(item => item.value !== null && item.value.trim() !== '');
  }

  isArtikelValid(candidate: string): boolean {
    if (candidate === null) {
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

  addMeaning() {
    this.currentEntry.meaningList.push(new Meaning());
  }

  addUsage() {
    this.currentEntry.usageList.push(new Usage());
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
        continue;
      }
    }

    for (const u of this.currentEntry.meaningList) {
      if (u.value != null && u.value.trim() !== '') {
        this.missingUsage = false;
        continue;
      }
    }
  }

  clearFields() {
    this.lastEntry = this.currentEntry;
    this.currentEntry = new Entry();
    this.missingMeaning = true;
    this.missingUsage = true;
  }

}
