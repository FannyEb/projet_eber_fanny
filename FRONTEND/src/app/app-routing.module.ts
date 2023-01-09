import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './components/client/client-details/client-details.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./module/product.module').then(m => m.ProductModule) },
  { path: 'client/:id', component: ClientDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
