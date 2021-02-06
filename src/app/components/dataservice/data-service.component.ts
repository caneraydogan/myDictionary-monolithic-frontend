import {Injectable} from '@angular/core';
import {Entry} from '../model/Entry';
import config from 'src/environments/config';
import {ResponseBody} from '../utils/endpoint.types';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../model/User';

@Injectable()
export class DataService {

    httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                Authorization: ''
            })
    };

    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private httpClient: HttpClient,
                private authenticationService: AuthenticationService) {
    }

    setTokenToHeader() {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authenticationService.getToken());
    }

    saveEntry(currentEntry: Entry): Observable<ResponseBody<any>> {
        this.setTokenToHeader();
        if (currentEntry.language === 'DE') {
            return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.DE.entry.saveEntry}`, currentEntry, this.httpOptions);
        } else {
            return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.EN.entry.saveEntry}`, currentEntry, this.httpOptions);
        }
    }

    updateEntry(currentEntry: Entry): Observable<ResponseBody<any>> {
        this.setTokenToHeader();
        if (currentEntry.language === 'DE') {
            return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.DE.entry.updateEntry}`, currentEntry, this.httpOptions);
        } else {
            return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.EN.entry.updateEntry}`, currentEntry, this.httpOptions);
        }
    }

    deleteEntry(currentEntry: Entry): Observable<ResponseBody<any>> {
        this.setTokenToHeader();
        if (currentEntry.language === 'DE') {
            return this.httpClient.delete<ResponseBody<any>>(`${config.endpoints.DE.entry.deleteEntry}` + '/' + currentEntry.id,
                this.httpOptions);
        } else {
            return this.httpClient.delete<ResponseBody<any>>(`${config.endpoints.EN.entry.deleteEntry}` + '/' + currentEntry.id,
                this.httpOptions);
        }
    }

    getEntries(userUUId: string, language: string, showDonePractising: boolean) {
        this.setTokenToHeader();
        if (language === 'DE') {
            return this.httpClient.get<ResponseBody<any>>(`${config.endpoints.DE.entry.findAll}` + '/' + userUUId
                + '/' + showDonePractising,
                this.httpOptions);
        } else {
            return this.httpClient.get<ResponseBody<any>>(`${config.endpoints.EN.entry.findAll}` + '/' + userUUId
                + '/' + showDonePractising,
                this.httpOptions);
        }
    }

    searchByWord(userUUId: string, language: string, word: string) {
        this.setTokenToHeader();
        if (language === 'DE') {
            return this.httpClient.get<ResponseBody<any>>(`${config.endpoints.DE.entry.findEntryByWord}` + '/' + userUUId
                + '/' + word, this.httpOptions);
        } else {
            return this.httpClient.get<ResponseBody<any>>(`${config.endpoints.EN.entry.findEntryByWord}` + '/' + userUUId
                + '/' + word, this.httpOptions);
        }
    }

    getRandomEntry(userUUId: string, language: string, showDonePractising: boolean) {
        this.setTokenToHeader();
        if (language === 'DE') {
            return this.httpClient.get<ResponseBody<any>>
            (`${config.endpoints.DE.entry.findRandomEntry}` + '/' + userUUId + '/' + showDonePractising, this.httpOptions);
        } else {
            return this.httpClient.get<ResponseBody<any>>
            (`${config.endpoints.EN.entry.findRandomEntry}` + '/' + userUUId + '/' + showDonePractising, this.httpOptions);
        }
    }

    getEntryById(language: string, id: number) {
        this.setTokenToHeader();
        if (language === 'DE') {
            return this.httpClient.get<ResponseBody<any>>
            (`${config.endpoints.DE.entry.findEntry}` + '/' + id, this.httpOptions);
        } else {
            return this.httpClient.get<ResponseBody<any>>
            (`${config.endpoints.EN.entry.findEntry}` + '/' + id, this.httpOptions);
        }
    }

    updatePractice(currentEntry: Entry) {
        this.setTokenToHeader();
        if (currentEntry.language === 'DE') {
            return this.httpClient.get<ResponseBody<any>>
            (`${config.endpoints.DE.entry.updatePractice}` + '/' + currentEntry.id + '/' + !currentEntry.donePracticing, this.httpOptions);
        } else {
            // tslint:disable-next-line:max-line-length
            return this.httpClient.get<ResponseBody<any>>
            (`${config.endpoints.EN.entry.updatePractice}` + '/' + currentEntry.id + '/' + !currentEntry.donePracticing, this.httpOptions);
        }
    }

    register(user: User) {
        return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.user.register}`, user, this.httpOptions);
    }

    updateUser(user: User) {
        return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.user.update}`, user, this.httpOptions);
    }
}
