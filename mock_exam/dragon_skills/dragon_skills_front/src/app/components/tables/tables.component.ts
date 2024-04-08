import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../../models/table';
import { TableService } from '../../services/tables/table.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent implements OnInit {
  @ViewChild('closeNewTableModal') closeNewTableModal!: ElementRef;
  @ViewChild('closeDeleteTableModal') closeDeleteTableModal!: ElementRef;
  currentTable: Table = {
    id: '',
    width: 0,
    height: 0,
    free: false,
  };
  newTable: Table = {
    id: '',
    width: 0,
    height: 0,
    free: false,
  };
  tables: Table[] = [];
  visibleAreaWidth = 200;
  visibleAreaHeight = 120;

  constructor(private tableService: TableService, private router: Router) {}

  ngOnInit(): void {
    this.tables = this.tableService.getAllTables();
    this.tables = this.calculateTableSizes();
  }

  goToTableDetail(id: string) {
    this.router.navigate(['/tables', id]);
  }

  createNewTable() {
    console.log(this.newTable);
    this.closeNewTableModal.nativeElement.click();
  }

  deleteTable() {
    console.log(this.currentTable);
    this.closeDeleteTableModal.nativeElement.click();
  }

  setCurrentTable(id: string) {
    const findedTable = this.tableService.getTableById(id);
    this.currentTable = findedTable ? findedTable : this.currentTable;
  }

  private calculateProportional(
    value: number,
    maxValue: number,
    visibleSize: number
  ): number {
    return (value / maxValue) * visibleSize;
  }

  private calculateTableSizes(): Table[] {
    const maxWidth = Math.max(...this.tables.map((table) => table.width));
    const maxHeight = Math.max(...this.tables.map((table) => table.height));

    return this.tables.map((table) => ({
      ...table,
      width: this.calculateProportional(
        table.width,
        maxWidth,
        this.visibleAreaWidth
      ),
      height: this.calculateProportional(
        table.height,
        maxHeight,
        this.visibleAreaHeight
      ),
    }));
  }
}
