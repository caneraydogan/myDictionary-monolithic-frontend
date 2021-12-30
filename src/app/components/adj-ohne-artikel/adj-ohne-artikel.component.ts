import {Component, OnInit} from '@angular/core';
// @ts-ignore
import AdjOhneArtikelJson from '../../components/data/adjOhneArtikel.json';

@Component({
    selector: 'app-adj-ohne-artikel',
    templateUrl: './adj-ohne-artikel.component.html',
    styleUrls: ['./adj-ohne-artikel.component.css']
})
export class AdjOhneArtikelComponent implements OnInit {

    dataSource = [] as any;
    tableColumns: string[];


    constructor() {
    }


    ngOnInit() {
        this.tableColumns = ['fall', 'sm', 'sf', 'sn', 'pm', 'pf', 'pn'];
        this.dataSource = AdjOhneArtikelJson.data;
        console.log(this.dataSource);
    }

    toggleVisibility(cell: any) {
        cell.visible = !cell.visible;
    }

    toggleAll() {
        const isVisible = this.dataSource[0].sm.visible;
        this.dataSource.forEach(entry => {
            entry.sm.visible = !isVisible;
            entry.sf.visible = !isVisible;
            entry.sn.visible = !isVisible;
            entry.pm.visible = !isVisible;
            entry.pf.visible = !isVisible;
            entry.pn.visible = !isVisible;
        });
    }
}
