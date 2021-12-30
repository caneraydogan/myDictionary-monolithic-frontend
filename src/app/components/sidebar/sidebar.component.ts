import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SidebarService} from '../services/sidebar.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('slide', [
            state('up', style({height: 0})),
            state('down', style({height: '*'})),
            transition('up <=> down', animate(200))
        ])
    ]
})
export class SidebarComponent implements OnInit {
    menus = [];

    constructor(public sidebarservice: SidebarService,
                private authenticationService: AuthenticationService,
                private router: Router) {
        this.menus = sidebarservice.getMenuList();
    }

    ngOnInit() {
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    toggle(currentMenu) {
        if (currentMenu.type === 'dropdown') {
            this.menus.forEach(element => {
                if (element === currentMenu) {
                    currentMenu.active = !currentMenu.active;
                } else {
                    element.active = false;
                }
            });
        } else {
            this.router.navigate([currentMenu.routerLink]);
        }
    }

    getState(currentMenu) {

        if (currentMenu.active) {
            return 'down';
        } else {
            return 'up';
        }
    }

    isLoggedIn(): boolean {
        return this.authenticationService.currentUserValue !== null;
    }

    get firstName(): string {
        if (this.authenticationService.currentUserValue !== null) {
            return this.authenticationService.currentUserValue.firstName;
        } else {
            return null;
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
