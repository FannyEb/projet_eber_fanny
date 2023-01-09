import { Product } from "../model/product";

export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) { }
}

export class DeleteProduct {
  static readonly type = '[Product] Delete';

  constructor(public payload: Product) { }
}