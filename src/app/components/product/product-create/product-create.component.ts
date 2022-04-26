import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from './../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  product: Product = {
    name: '',
    price: undefined
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  createProduct() {
    this.productService.create(this.product);
    this.productService.showMessage("Produto criado com sucesso.");
    this.router.navigate(['/products']);
  }
}
