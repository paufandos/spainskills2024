import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../../../services/tables/table.service';
import { ReservationService } from '../../../services/reservations/reservation.service';
import { Table } from '../../../models/table';
import { Reservation } from '../../../models/reservation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationRequest } from '../../../models/reservation.request';

@Component({
  selector: 'app-table-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.scss',
})
export class TableDetailComponent implements OnInit {
  @ViewChild('closeNewReservationModal') closeNewReservationModal!: ElementRef;
  currentTable: Table = {
    id: '',
    width: 0,
    height: 0,
    free: false,
  };
  tableReservations: Reservation[] = [];
  newReservation: ReservationRequest = {
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    userId: '',
    width: this.currentTable.width,
    height: this.currentTable.height,
    game: '',
  };
  hasDatesError = false;

  constructor(
    private router: ActivatedRoute,
    private tableService: TableService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    let tableId: string;
    this.router.params.subscribe((params) => {
      tableId = params['id'];
      const findedTable = this.tableService.getTableById(tableId);
      this.currentTable = !!findedTable ? findedTable : this.currentTable;
      this.tableReservations =
        this.reservationService.getReservationsByTableId(tableId);
    });
  }

  createReservation() {
    this.validateDates();
    if (this.hasDatesError) {
      return;
    }

    console.log(this.newReservation);
    this.closeNewReservationModal.nativeElement.click();
  }

  validateDates() {
    const startDate = new Date(this.newReservation.startDate);
    const endDate = new Date(this.newReservation.endDate);
    const today = new Date(Date.now());

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      !this.isSameDay(startDate, endDate) ||
      startDate > endDate ||
      startDate < today ||
      endDate < today
    ) {
      this.hasDatesError = true;
    } else {
      this.hasDatesError = false;
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
