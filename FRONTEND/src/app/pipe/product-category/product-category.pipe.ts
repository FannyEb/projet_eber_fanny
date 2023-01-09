import { Pipe, PipeTransform } from '@angular/core';
import { ProductCategory } from '../../model/product-category';

@Pipe({
  name: 'productCategory'
})
export class ProductCategoryPipe implements PipeTransform {

  transform(value: ProductCategory, ...args: unknown[]): string {
    switch(value){
      case ProductCategory.Vans || 0:
        return 'Vans';
      case ProductCategory.Converse || 1:
        return 'Converse';
      case ProductCategory.Crocs || 2:
        return 'Crocs';
      case ProductCategory.FlipFlops || 3:
        return 'Tongues';
      case ProductCategory.Nike || 4:
        return 'Nike';
      case ProductCategory.Mizuno || 5:
        return 'Mizuno';
      case ProductCategory.NewBalance || 6:
        return 'New Balance';
    }

    return 'Inconnu';
  }

}
