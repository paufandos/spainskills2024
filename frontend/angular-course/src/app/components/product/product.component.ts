import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addSeeCardDetailEvent = new EventEmitter<number>();

  seeCardDetail(id: number) {
    this.addSeeCardDetailEvent.emit(id)
  }
}
