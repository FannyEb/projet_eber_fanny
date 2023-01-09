import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { AddProduct, DeleteProduct } from 'src/app/model/shopping-action';
import { ShoppingState } from 'src/app/model/shopping-state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {

  @Select(ShoppingState.getListProducts)
  dataSource$!: Observable<Product[]>;

  @Select(ShoppingState.getTotalPrice)
  totalPrice$!: Observable<number>;

  displayedColumns: string[] = ['name', 'quantity', 'price', 'action-delete'];
  constructor(private store: Store) { 
  }

  deleteFromShoppingList(element : Product) {
    this.store.dispatch(new DeleteProduct(element));
  }

  addFromShoppingList(element : Product) {
    this.store.dispatch(new AddProduct(element));
  }

}
