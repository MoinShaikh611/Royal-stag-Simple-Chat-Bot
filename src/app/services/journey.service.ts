import { ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { DynamicComponent } from '../components/dynamic.component';
import { DynamicDirective } from '../directives/dynamic.directive';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  dynamicHost!: DynamicDirective;
  whichTimeUser = 1;
  dataMessage = '';

  constructor(private resolver: ComponentFactoryResolver) {}

  init(dynamicHost: DynamicDirective) {
    this.dynamicHost = dynamicHost;
  }

  addComponent(type: Type<DynamicComponent>, data?: any): void {
    const factory = this.resolver.resolveComponentFactory(type);
    const componentRef =
      this.dynamicHost.viewContainerRef.createComponent<DynamicComponent>(
        factory
      );
    componentRef.instance.data = data;
  }
}
