import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { style } from '@angular/animations';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    images: []
  };
  isDetailsVissible = false;

  constructor(private productsService: ProductsService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }


  seeCardDetail(id: number) {
    this.productsService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.modalService.open("modal")
    })
  }

  closeModal() {
    this.modalService.close("modal");
  }

  error() {
    this.productsService.error();
  }
}
