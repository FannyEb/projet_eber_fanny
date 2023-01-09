import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if(value.substring(0,4)!=="+33 ")
      value = "+33 " + value;
    switch(value.length){
      case 6: return value.slice(0,6)+'.'; 
      case 9: return value.slice(0,9)+'.'; 
      case 12: return value.slice(0,12)+'.';
      case 15: return value.slice(0,15)+'.';
      case 18: return value;
      default: return value;
    }
  }

}
