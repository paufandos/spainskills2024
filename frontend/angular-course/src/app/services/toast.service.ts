import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  show() {
    const toast = document.getElementById('toast');
    toast?.classList.remove("toast-fade-out")
    toast?.classList.add("toast-fade-in")
    setTimeout(() => {
      this.hide()
    }, 5000);
  }

  hide() {
    const toast = document.getElementById('toast');
    toast?.classList.add("toast-fade-out")
  }
}
