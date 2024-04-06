import { Component, OnInit } from '@angular/core';
import { ReservationRequest } from '../../models/reservation.request';
import { TableService } from '../../services/tables/table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth/auth.service';
import { Table } from '../../models/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservation: ReservationRequest = {
    startDate: new Date(),
    endDate: new Date(),
    userId: '',
    width: 0,
    height: 0,
    game: '',
  };
  sizeRadioButton: boolean = false;
  gameRadioButton: boolean = false;
  firstChangeSize = true;
  firstChangeGame = true;
  tables: Table[] = [];
  visibleAreaWidth = 200;
  visibleAreaHeight = 120;

  constructor(
    private tableService: TableService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tables = this.tableService.getAllTables();
    this.tables = this.calculateTableSizes();
    this.reservation.userId = this.authService.getUserName();
  }

  calculateProportional(
    value: number,
    maxValue: number,
    visibleSize: number
  ): number {
    return (value / maxValue) * visibleSize;
  }

  calculateTableSizes(): Table[] {
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

  isReservationSameDay(startDate: Date, endDate: Date): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start.toDateString() === end.toDateString();
  }

  doTableReservation() {
    console.log(this.reservation);
    this.modalService.dismissAll();
  }

  changeSizeRadioButtonValue() {
    if (this.firstChangeSize) {
      this.firstChangeSize = false;
    }

    if (!this.firstChangeGame) {
      this.gameRadioButton = !this.gameRadioButton;
      this.reservation.game = '';
    }
  }

  changeGameRadioButtonValue() {
    if (this.firstChangeGame) {
      this.firstChangeGame = false;
    }

    if (!this.firstChangeSize) {
      this.sizeRadioButton = !this.sizeRadioButton;
      this.reservation.height = 0;
      this.reservation.width = 0;
    }
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }
}
