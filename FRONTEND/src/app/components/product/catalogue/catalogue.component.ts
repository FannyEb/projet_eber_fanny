import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
import { AddProduct } from 'src/app/model/shopping-action';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  products : Product[] = []
  categories: ProductCategory[] = [ ProductCategory.Vans, ProductCategory.Converse, ProductCategory.Crocs, ProductCategory.FlipFlops, ProductCategory.Nike, ProductCategory.Mizuno, ProductCategory.NewBalance ];
  filteredCategories: Set<ProductCategory> = new Set;
  filteredTerm: string = '';

  constructor(private store: Store, private productService: ProductService, private notifService: NotificationService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        this.notifService.error("Erreur de chargement", 3000);
      }
    );
  }

  addToShoppingList(product: Product): void{
    this.store.dispatch(new AddProduct(product));
  }
  
  removeCategory(category: ProductCategory): void{
    this.filteredCategories.delete(category);
  }

  addCategory(category: ProductCategory): void{
    this.filteredCategories.add(category);
  }

  categoryFilterUpdate(category: ProductCategory): void
  {
    if(this.filteredCategories.has(category)){
      this.removeCategory(category);
    }
    else{
      this.addCategory(category);
    }

    this.getProductFiltered();
  }

  getProductFiltered(): void{
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.filter((product: { name: string; category: string; }) => {
          let predicate = true
          if(this.filteredTerm != ''){
            predicate = product.name.toLowerCase().includes(this.filteredTerm.toLowerCase());
          }
          if(this.filteredCategories.size > 0 && predicate){
            predicate = this.filteredCategories.has(parseInt(product.category));
          }
          return predicate;
        });
      },
      (error) => {
        this.notifService.error("Erreur de chargement", 3000);
      }
    );
  }

}
