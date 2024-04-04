import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      'https://api.escuelajs.co/api/v1/products'
    );
  }

  getProductById(id: number) {
    return this.http.get<Product>(
      'https://api.escuelajs.co/api/v1/products/'+id
    );
  }

  error() {
    console.log('ae2');
    return this.http.get<Product>(
      'https://api.escuelajs.co/api/v1/products/'+"1120301248i2184209384948394"
    ).subscribe(data => console.log(data));
  }
}
