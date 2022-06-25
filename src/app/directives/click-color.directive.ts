import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickColor]',
})
export class ClickColorDirective {
  @Input('appClickColor') highlightColor!: string;

  constructor(private el: ElementRef) {}
  @HostListener('click') onMouseClick() {
    this.highlight(this.highlightColor || '#7e1615');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.background = color;
    this.el.nativeElement.style.color = '#fff';
  }
}
