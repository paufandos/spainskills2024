import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  getReservationsByTableId(tableId: string): Reservation[] {
    return this.reservationData;
  }

  reservationData: Reservation[] = [
    {
      id: '1',
      tableId: 'table1',
      startDate: new Date('2024-04-10T08:00:00Z'),
      endDate: new Date('2024-04-12T18:00:00Z'),
      userId: 'user1',
      width: 20,
      height: 10,
    },
    {
      id: '2',
      tableId: 'table2',
      startDate: new Date('2024-04-15T10:00:00Z'),
      endDate: new Date('2024-04-16T15:00:00Z'),
      userId: 'user2',
      width: 22,
      height: 12,
    },
    {
      id: '3',
      tableId: 'table3',
      startDate: new Date('2024-04-20T14:00:00Z'),
      endDate: new Date('2024-04-21T12:00:00Z'),
      userId: 'user3',
      width: 18,
      height: 8,
    },
    {
      id: '4',
      tableId: 'table4',
      startDate: new Date('2024-04-12T08:00:00Z'),
      endDate: new Date('2024-04-14T18:00:00Z'),
      userId: 'user4',
      width: 24,
      height: 14,
    },
    {
      id: '5',
      tableId: 'table5',
      startDate: new Date('2024-04-25T10:00:00Z'),
      endDate: new Date('2024-04-26T15:00:00Z'),
      userId: 'user5',
      width: 20,
      height: 10,
    },
    {
      id: '6',
      tableId: 'table6',
      startDate: new Date('2024-04-28T14:00:00Z'),
      endDate: new Date('2024-04-29T12:00:00Z'),
      userId: 'user6',
      width: 22,
      height: 12,
    },
    {
      id: '7',
      tableId: 'table7',
      startDate: new Date('2024-04-30T08:00:00Z'),
      endDate: new Date('2024-05-01T18:00:00Z'),
      userId: 'user7',
      width: 18,
      height: 8,
    },
    {
      id: '8',
      tableId: 'table8',
      startDate: new Date('2024-05-02T10:00:00Z'),
      endDate: new Date('2024-05-03T15:00:00Z'),
      userId: 'user8',
      width: 24,
      height: 14,
    },
    {
      id: '9',
      tableId: 'table9',
      startDate: new Date('2024-05-05T14:00:00Z'),
      endDate: new Date('2024-05-06T12:00:00Z'),
      userId: 'user9',
      width: 20,
      height: 10,
    },
    {
      id: '10',
      tableId: 'table10',
      startDate: new Date('2024-05-08T08:00:00Z'),
      endDate: new Date('2024-05-09T18:00:00Z'),
      userId: 'user10',
      width: 22,
      height: 12,
    },
    {
      id: '11',
      tableId: 'table11',
      startDate: new Date('2024-05-10T10:00:00Z'),
      endDate: new Date('2024-05-11T15:00:00Z'),
      userId: 'user11',
      width: 18,
      height: 8,
    },
    {
      id: '12',
      tableId: 'table12',
      startDate: new Date('2024-05-12T14:00:00Z'),
      endDate: new Date('2024-05-13T12:00:00Z'),
      userId: 'user12',
      width: 24,
      height: 14,
    },
    {
      id: '13',
      tableId: 'table13',
      startDate: new Date('2024-05-15T08:00:00Z'),
      endDate: new Date('2024-05-16T18:00:00Z'),
      userId: 'user13',
      width: 20,
      height: 10,
    },
    {
      id: '14',
      tableId: 'table14',
      startDate: new Date('2024-05-18T10:00:00Z'),
      endDate: new Date('2024-05-19T15:00:00Z'),
      userId: 'user14',
      width: 22,
      height: 12,
    },
    {
      id: '15',
      tableId: 'table15',
      startDate: new Date('2024-05-20T14:00:00Z'),
      endDate: new Date('2024-05-21T12:00:00Z'),
      userId: 'user15',
      width: 18,
      height: 8,
    },
    {
      id: '16',
      tableId: 'table16',
      startDate: new Date('2024-05-22T08:00:00Z'),
      endDate: new Date('2024-05-23T18:00:00Z'),
      userId: 'user16',
      width: 24,
      height: 14,
    },
    {
      id: '17',
      tableId: 'table17',
      startDate: new Date('2024-05-25T10:00:00Z'),
      endDate: new Date('2024-05-26T15:00:00Z'),
      userId: 'user17',
      width: 20,
      height: 10,
    },
    {
      id: '18',
      tableId: 'table18',
      startDate: new Date('2024-05-28T14:00:00Z'),
      endDate: new Date('2024-05-29T12:00:00Z'),
      userId: 'user18',
      width: 22,
      height: 12,
    },
    {
      id: '19',
      tableId: 'table19',
      startDate: new Date('2024-05-30T08:00:00Z'),
      endDate: new Date('2024-05-31T18:00:00Z'),
      userId: 'user19',
      width: 18,
      height: 8,
    },
    {
      id: '20',
      tableId: 'table20',
      startDate: new Date('2024-06-01T10:00:00Z'),
      endDate: new Date('2024-06-02T15:00:00Z'),
      userId: 'user20',
      width: 24,
      height: 14,
    },
    {
      id: '21',
      tableId: 'table21',
      startDate: new Date('2024-06-05T14:00:00Z'),
      endDate: new Date('2024-06-06T12:00:00Z'),
      userId: 'user21',
      width: 20,
      height: 10,
    },
    {
      id: '22',
      tableId: 'table22',
      startDate: new Date('2024-06-08T08:00:00Z'),
      endDate: new Date('2024-06-09T18:00:00Z'),
      userId: 'user22',
      width: 22,
      height: 12,
    },
    {
      id: '23',
      tableId: 'table23',
      startDate: new Date('2024-06-10T10:00:00Z'),
      endDate: new Date('2024-06-11T15:00:00Z'),
      userId: 'user23',
      width: 18,
      height: 8,
    },
    {
      id: '24',
      tableId: 'table24',
      startDate: new Date('2024-06-12T14:00:00Z'),
      endDate: new Date('2024-06-13T12:00:00Z'),
      userId: 'user24',
      width: 24,
      height: 14,
    },
    {
      id: '25',
      tableId: 'table25',
      startDate: new Date('2024-06-15T08:00:00Z'),
      endDate: new Date('2024-06-16T18:00:00Z'),
      userId: 'user25',
      width: 20,
      height: 10,
    },
  ];
}
