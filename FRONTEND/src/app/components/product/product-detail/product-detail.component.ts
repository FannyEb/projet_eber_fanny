import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
import { AddProduct } from 'src/app/model/shopping-action';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  constructor(private store: Store, private notifService: NotificationService, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    //id in url
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id!).subscribe(
      (data) => {
        data.category = parseInt(data.category);
        this.product = data;        
      },
      (error) => {
        this.notifService.error("Erreur de chargement", 3000);
      }
    );
  }

  addFromShoppingList(): void {
    this.store.dispatch(new AddProduct(this.product));
  }

}
