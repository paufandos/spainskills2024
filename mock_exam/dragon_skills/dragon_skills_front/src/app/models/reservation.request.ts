export interface ReservationRequest {
  startDate: Date,
  endDate: Date,
  userId: string,
  width: number,
  height: number,
  game: string,
}
