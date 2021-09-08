import { Component, OnInit } from '@angular/core';
import { Product } from './../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products!: Product[];
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }
  
  deleteProduct(id: string) {
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto excluído com sucesso.")
      location.reload();
    })
  }

}