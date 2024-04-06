import { Injectable } from '@angular/core';
import { Table } from '../../models/table';
import { randomInt } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  tables: Array<Table> = [];

  getAllTables() {
    for (let i = 0; i < 132; i++) {
      this.tables.push({
        id: i.toLocaleString(),
        width: Math.floor(Math.random() * 50),
        height: Math.floor(Math.random() * 30),
        free: this.generarBooleanoAleatorio(),
      });
    }
    return this.tables;
  }

  generarBooleanoAleatorio(): boolean {
    return Math.random() < 0.5; // Devuelve true si el número generado es menor que 0.5, de lo contrario, devuelve false
  }
}
