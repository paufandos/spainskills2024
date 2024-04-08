import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReservationRequest } from '../../models/reservation.request';
import { TableService } from '../../services/tables/table.service';
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
  @ViewChild('closeButton') closeButton!: ElementRef;

  reservation: ReservationRequest = {
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    userId: '',
    width: 0,
    height: 0,
    game: '',
  };

  sizeRadioButton: boolean = false;
  gameRadioButton: boolean = false;
  firstChangeSize = true;
  firstChangeGame = true;
  datesError = false;
  gameError = false;
  admin = false;

  tables: Table[] = [];
  visibleAreaWidth = 200;
  visibleAreaHeight = 120;

  constructor(
    private tableService: TableService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tables = this.tableService.getAllTables();
    this.tables = this.calculateTableSizes();
    this.reservation.userId = this.authService.getUserName();
    this.admin = this.authService.isUserAdmin();
  }

  doTableReservation() {
    this.isDatesError();
    this.isGameError();
    console.log('game', this.gameError);
    console.log('dates', this.datesError);
    if (this.gameError || this.datesError) {
      return;
    }

    console.log(this.reservation);
    this.closeButton.nativeElement.click();
  }

  isDatesError() {
    const startDate = new Date(this.reservation.startDate);
    const endDate = new Date(this.reservation.endDate);
    const today = new Date(Date.now());

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      !this.isSameDay(startDate, endDate) ||
      startDate > endDate ||
      startDate < today ||
      endDate < today
    ) {
      this.datesError = true;
    } else {
      this.datesError = false;
    }
  }

  changeSizeRadioButtonValue() {
    if (this.firstChangeSize) {
      this.firstChangeSize = false;
    }

    if (!this.firstChangeGame) {
      this.gameRadioButton = !this.gameRadioButton;
      this.isGameError();
      this.reservation.game = '';
    }
  }

  onChangeGame() {
    this.changeGameRadioButtonValue();
    this.isGameError();
  }

  isGameError() {
    console.log(this.gameRadioButton);

    if (this.gameRadioButton && this.reservation.game.trim().length <= 0) {
      this.gameError = true;
    } else {
      this.gameError = false;
    }
  }

  private changeGameRadioButtonValue() {
    if (this.firstChangeGame) {
      this.firstChangeGame = false;
    }

    if (!this.firstChangeSize) {
      this.sizeRadioButton = !this.sizeRadioButton;
      this.reservation.height = 0;
      this.reservation.width = 0;
    }
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

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
