import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChipActivate]'
})
export class ChipActivateDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = 'white';
    this.el.nativeElement.style.opacity = '0.3';
    this.el.nativeElement.style.color = 'black';
  
  }

  @HostListener('click') onClick() {
    if(this.el.nativeElement.style.opacity === '1'){
      this.el.nativeElement.style.opacity = '0.3';
    }
    else{
      this.el.nativeElement.style.opacity = '1';
    }
  }

}
