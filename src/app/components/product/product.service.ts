import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  getLocalStorageItems() {
    return JSON.parse(localStorage.getItem('products') as string) || [];
  }

  setLocalStorageItems(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  create(product: Product) {
    let products = this.getLocalStorageItems();
    product.id = products.length ? (parseInt(products[products.length - 1].id) + 1).toString() : '1';
    products.push(product);
    this.setLocalStorageItems(products);
  }

  read(): Product[] {
    return this.getLocalStorageItems() as Product[];
  }

  readById(id: string): Product {
    return this.getLocalStorageItems().find((product: { id: string }) => product.id === id);
  }

  update(product: Product) {
    let products = this.getLocalStorageItems();
    let targetProduct = products.find((_product: { id: string }) => _product.id === product.id) as Product;
    targetProduct.name  = product.name;
    targetProduct.price = product.price;
    this.setLocalStorageItems(products);
  }

  delete(id: string) {
    let products = this.getLocalStorageItems();
    let targetProductIndex = products.findIndex((product: { id: string }) => product.id === id);
    products.splice(targetProductIndex, 1);
    this.setLocalStorageItems(products);
  }
}
