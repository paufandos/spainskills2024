export interface Reservation {
  id: string;
  tableId: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  width: number;
  height: number;
}
