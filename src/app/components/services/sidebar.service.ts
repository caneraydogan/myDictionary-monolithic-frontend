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
            routerLink: './practice',
            public: true
        },
        {
            title: 'New Entry',
            active: false,
            type: 'simple',
            routerLink: './new-entry',
            public: false
        },
        {
            title: 'Entry List',
            active: false,
            type: 'simple',
            routerLink: './entry-list',
            public: true
        },
        {
            title: 'AdjektivDeklination',
            active: false,
            type: 'dropdown',
            public: true,
            submenus: [
                {
                    title: 'Adjektive ohne Artikel',
                    routerLink: './adj-ohne-artikel'
                },
                {
                    title: 'Bestimmter Artikel',
                    routerLink: './adj-bestimmter-artikel'
                },
                {
                    title: 'Unbestimmter Artikel',
                    routerLink: './adj-unbestimmter-artikel'
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
