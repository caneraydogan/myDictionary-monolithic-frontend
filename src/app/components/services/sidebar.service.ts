import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    toggled = false;
    menus = [
        {
            title: 'Practice',
            active: false,
            type: 'simple',
            routerLink: './practice'
        },
        {
            title: 'New Entry',
            active: false,
            type: 'simple',
            routerLink: './new-entry'
        },
        {
            title: 'Entry List',
            active: false,
            type: 'simple',
            routerLink: './entry-list'
        },
        {
            title: 'AdjektivDeklination',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Adjektive ohne Artikel',
                },
                {
                    title: 'Bestimmtem Artikel '
                },
                {
                    title: 'Unbestimmter Artikel'
                }
            ]
        }
    ];

    constructor() {
    }

    toggle() {
        this.toggled = !this.toggled;
    }

    getSidebarState() {
        return this.toggled;
    }

    setSidebarState(state: boolean) {
        this.toggled = state;
    }

    getMenuList() {
        return this.menus;
    }
}
