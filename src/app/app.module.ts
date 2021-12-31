import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdjOhneArtikelComponent } from './components/adj-ohne-artikel/adj-ohne-artikel.component';
import { AdjBestimmterArtikelComponent } from './components/adj-bestimmter-artikel/adj-bestimmter-artikel.component';
import { AdjUnbestimmterArtikelComponent } from './components/adj-unbestimmter-artikel/adj-unbestimmter-artikel.component';
import { PracticeVerbComponent } from './components/practice-verb/practice-verb.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const appRoutes: Routes = [
    {path: 'entry-list', component: EntryListComponent},
    {path: 'new-entry', component: NewEntryComponent},
    {path: 'practice', component: PracticeComponent},
    {path: 'practice/:id', component: PracticeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent},
    {path: 'adj-ohne-artikel', component: AdjOhneArtikelComponent},
    {path: 'adj-bestimmter-artikel', component: AdjBestimmterArtikelComponent},
    {path: 'adj-unbestimmter-artikel', component: AdjUnbestimmterArtikelComponent},
    {path: 'practice-verb', component: PracticeVerbComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        EntryListComponent,
        NewEntryComponent,
        PracticeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        SidebarComponent,
        AdjOhneArtikelComponent,
        AdjBestimmterArtikelComponent,
        AdjUnbestimmterArtikelComponent,
        PracticeVerbComponent
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
        ReactiveFormsModule,
        PerfectScrollbarModule,
        BrowserAnimationsModule
    ],
    providers: [DataService, EntryListComponent, NewEntryComponent, PracticeComponent,
        LoginComponent, RegisterComponent, UserComponent, AdjOhneArtikelComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
