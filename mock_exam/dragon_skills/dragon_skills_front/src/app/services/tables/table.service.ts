import { Injectable } from '@angular/core';
import { Table } from '../../models/table';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private router: Router) {}

  tables: Array<Table> = [];

  getAllTables() {
    for (let i = 0; i < 50; i++) {
      this.tables.push({
        id: i.toLocaleString(),
        width: Math.floor(Math.random() * 25),
        height: Math.floor(Math.random() * 15),
        free: this.generarBooleanoAleatorio(),
      });
    }
    return this.tables;
  }

  getTableById(id: string): Table | undefined {
    this.getAllTables();
    const tableFinded = this.tables.find((table) => table.id === id);

    if (!tableFinded) {
      this.router.navigate(['/notfound']);
      return;
    }

    return tableFinded;
  }

  generarBooleanoAleatorio(): boolean {
    return Math.random() < 0.5;
  }
}
