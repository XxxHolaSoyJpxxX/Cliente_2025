import { Directive, Input, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight implements OnChanges {

  @Input() appHighlight: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('el valor de highligth  cambio ', this.appHighlight,this.el.nativeElement)
    if (this.appHighlight){
      (this.el.nativeElement as HTMLElement).classList.add('selected-row');
    }else{
      (this.el.nativeElement as HTMLElement).classList.remove('selected-row')
    }
  }
}

