import { Component, AfterViewInit, ViewChild, Type } from '@angular/core';
import { DynamicDirective } from 'src/app/directives/dynamic.directive';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';
import { MobileNumberComponent } from '../mobile-number/mobile-number.component';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements AfterViewInit {
  @ViewChild(DynamicDirective, { static: true }) dynamicHost!: DynamicDirective;

  constructor(
    private journeyServie: JourneyService,
    private apiService: ApiService
  ) {}

  ngAfterViewInit(): void {
    this.initialRegistration();

    setTimeout(() => {
      this.journeyServie.init(this.dynamicHost);
      this.journeyServie.addComponent(MobileNumberComponent);
    }, 0);
  }

  async initialRegistration() {
    const data = await this.apiService.initializeRegistration();
    this.apiService.refId = data.refID;
  }
}
