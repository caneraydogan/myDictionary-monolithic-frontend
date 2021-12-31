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
            type: 'dropdown',
            submenus: [
                {
                    title: 'Verb',
                    routerLink: './practice-verb'
                },
                {
                    title: 'Noun',
                    routerLink: './practice'
                }
            ]
        },
        {
            title: 'New Word',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Verb',
                    routerLink: './new-verb'
                },
                {
                    title: 'Noun',
                    routerLink: './new-noun'
                }
            ]
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
