import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShoppingState } from 'src/app/model/shopping-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() username = '';
  @Input() id = '';

  @Output() disconnected = new EventEmitter<string>();

  @Select(ShoppingState.getNbProducts)
  numberProduct$!: Observable<number>;
}
