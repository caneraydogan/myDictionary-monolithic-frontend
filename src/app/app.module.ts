import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {EntryListComponent} from './components/entry-list/entry-list.component';
import {MatButtonModule, MatTableModule} from '@angular/material';
import {DataService} from './components/dataservice/data-service.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NewEntryComponent} from './components/new-entry/new-entry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PracticeComponent} from './components/practice/practice.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserComponent} from './components/user/user.component';
import {HttpErrorInterceptor} from './components/utils/HttpErrorInterceptor';


const appRoutes: Routes = [
    {path: 'entry-list', component: EntryListComponent},
    {path: 'new-entry', component: NewEntryComponent},
    {path: 'practice', component: PracticeComponent},
    {path: 'practice/:language/:id', component: PracticeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        EntryListComponent,
        NewEntryComponent,
        PracticeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        MatTableModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false,
                useHash: true
            }
        ),
        AppRoutingModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    providers: [DataService, EntryListComponent,
        NewEntryComponent, PracticeComponent, LoginComponent, RegisterComponent, UserComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
