import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyComponent } from './components/journey/journey.component';
import { KycComponent } from './components/kyc/kyc.component';
import { LandingComponent } from './components/landing/landing.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const routes: Routes = [
  { path: 'journey', component: JourneyComponent },
  {
    path: 'landing',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'kyc',
    component: KycComponent,
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
  },
  {
    path: '**',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
