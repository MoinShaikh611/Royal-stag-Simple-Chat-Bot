import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appInactive]',
})
export class InactiveDirective {
  @HostBinding('style.pointer-events') pointerEvents!: string;
  @Input() set appInactive(value: boolean) {
    this.pointerEvents = value ? 'none' : 'auto';
  }
}
