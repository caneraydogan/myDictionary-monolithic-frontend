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
        return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.entry.saveEntry}`, currentEntry, this.httpOptions);
    }

    updateEntry(currentEntry: Entry): Observable<ResponseBody<any>> {
        this.setTokenToHeader();
        return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.entry.updateEntry}`, currentEntry, this.httpOptions);
    }

    deleteEntry(currentEntry: Entry): Observable<ResponseBody<any>> {
        this.setTokenToHeader();
        return this.httpClient.delete<ResponseBody<any>>(`${config.endpoints.entry.deleteEntry}` + '/' + currentEntry.id,
            this.httpOptions);

    }

    getEntries(userUUId: string, showDonePractising: boolean) {
        this.setTokenToHeader();

        return this.httpClient.get<ResponseBody<any>>(`${config.endpoints.entry.findAll}` + '/' + userUUId
            + '/' + showDonePractising,
            this.httpOptions);

    }

    searchByWord(userUUId: string, word: string) {
        this.setTokenToHeader();
        return this.httpClient.get<ResponseBody<any>>(`${config.endpoints.entry.findEntryByWord}` + '/' + userUUId
            + '/' + word, this.httpOptions);

    }

    getRandomEntry(userUUId: string, showDonePractising: boolean) {
        this.setTokenToHeader();
        return this.httpClient.get<ResponseBody<any>>
        (`${config.endpoints.entry.findRandomEntry}` + '/' + userUUId + '/' + showDonePractising, this.httpOptions);

    }

    getEntryById(id: number) {
        this.setTokenToHeader();
        return this.httpClient.get<ResponseBody<any>>
        (`${config.endpoints.entry.findEntry}` + '/' + id, this.httpOptions);

    }

    updatePractice(currentEntry: Entry) {
        this.setTokenToHeader();
        return this.httpClient.get<ResponseBody<any>>
        (`${config.endpoints.entry.updatePractice}` + '/' + currentEntry.id + '/' + !currentEntry.donePracticing, this.httpOptions);

    }

    register(user: User) {
        return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.user.register}`, user, this.httpOptions);
    }

    updateUser(user: User) {
        return this.httpClient.post<ResponseBody<any>>(`${config.endpoints.user.update}`, user, this.httpOptions);
    }
}
