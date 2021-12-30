import { Component, OnInit } from '@angular/core';

// @ts-ignore
import AdjBestimmterArtikelJson from '../../components/data/adjBestimmterArtikel.json';

@Component({
  selector: 'app-adj-bestimmtem-artikel',
  templateUrl: './adj-bestimmter-artikel.component.html',
  styleUrls: ['./adj-bestimmter-artikel.component.css']
})
export class AdjBestimmterArtikelComponent implements OnInit {
  dataSource = [] as any;
  tableColumns: string[];


  constructor() {
  }


  ngOnInit() {
    this.tableColumns = ['fall', 'sm', 'sf', 'sn', 'pm', 'pf', 'pn'];
    this.dataSource = AdjBestimmterArtikelJson.data;
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
