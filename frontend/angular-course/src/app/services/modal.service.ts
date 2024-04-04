import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  open(id: string) {
    const modal = document.getElementById(id);
    modal?.classList.remove('d-none');
    modal?.classList.add('d-block');
  }

  close(id: string) {
    const modal = document.getElementById(id);
    modal?.classList.remove('d-block');
    modal?.classList.add('d-none');

  }
}
