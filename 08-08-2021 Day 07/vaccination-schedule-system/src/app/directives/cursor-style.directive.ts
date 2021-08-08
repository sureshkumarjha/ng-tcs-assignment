import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCursorStyle]'
})
export class CursorStyleDirective {

  constructor(private element : ElementRef) {
      element.nativeElement.style.cursor = "pointer";
   }

}
