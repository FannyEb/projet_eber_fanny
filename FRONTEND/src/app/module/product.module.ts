import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from '../components/product/catalogue/catalogue.component';
import { ProductDetailComponent } from '../components/product/product-detail/product-detail.component';
import { ShoppingListComponent } from '../components/product/shopping-list/shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { ProductCategoryPipe } from '../pipe/product-category/product-category.pipe';
import { FormsModule } from '@angular/forms';
import { ChipActivateDirective } from '../directive/chip-activate/chip-activate.directive';

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'shopping-list', component: ShoppingListComponent }
];


@NgModule({
  declarations: [
    CatalogueComponent,
    ProductDetailComponent,
    ShoppingListComponent,
    ProductCategoryPipe,
    ChipActivateDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FormsModule
  ]
})
export class ProductModule { }
