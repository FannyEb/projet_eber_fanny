import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/client/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AngularMaterialModule } from './module/angular-material.module';
import { CatalogueComponent } from './components/product/catalogue/catalogue.component';
import { ChipActivateDirective } from './directive/chip-activate/chip-activate.directive';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ShoppingListComponent } from './components/product/shopping-list/shopping-list.component';
import { ClientService } from './service/client/client.service';
import { ProductService } from './service/product/product.service';
import { ApiHttpInterceptor } from './service/api-http-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './components/client/sign-up/sign-up.component';
import { NgxsModule } from '@ngxs/store';
import { ShoppingState } from './model/shopping-state';
import { ClientDetailsComponent } from './components/client/client-details/client-details.component';
import { InputNumbersDirective } from './directive/input-numbers/input-numbers.directive';
import { PhoneNumberPipe } from './pipe/phone-number/phone-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NotificationComponent,
    SignUpComponent,
    ClientDetailsComponent,
    InputNumbersDirective,
    PhoneNumberPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxsModule.forRoot([ShoppingState]),
  ],
  providers: [
    ClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
      deps: [ClientService, ProductService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
