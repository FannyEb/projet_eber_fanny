import { Directive, ElementRef, Input } from '@angular/core';
import { PhoneNumberPipe } from 'src/app/pipe/phone-number/phone-number.pipe';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Directive({
  selector: '[appInputNumbers]'
})
export class InputNumbersDirective {

  @Input() appInputNumbers = "5"
  
  constructor(private el: ElementRef, private notifier: NotificationService) {
    this.el.nativeElement.onkeypress = (evt: { which: number; preventDefault: () => void; }) => {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
        notifier.error('Dans ce champ, vous ne pouvez entrer que des chiffres', 3000);
      }
      if(this.el.nativeElement.value.length >= this.appInputNumbers){
        evt.preventDefault();
        notifier.error('Vous ne pouvez pas entrer plus de ' + this.appInputNumbers + ' chiffres', 3000);
      }

      if(this.appInputNumbers=="18"){
        let pipe = new PhoneNumberPipe();
        this.el.nativeElement.value = pipe.transform(this.el.nativeElement.value);
      }
    }
    
 }

}
