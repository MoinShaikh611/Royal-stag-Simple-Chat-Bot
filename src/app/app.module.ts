import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JourneyComponent } from './components/journey/journey.component';
import { DynamicDirective } from './directives/dynamic.directive';
import { InactiveDirective } from './directives/inactive.directive';
import { TncComponent } from './components/tnc/tnc.component';
import { MobileNumberComponent } from './components/mobile-number/mobile-number.component';
import { PincodeComponent } from './components/pincode/pincode.component';
import { QuestionComponent } from './components/question/question.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { LandingComponent } from './components/landing/landing.component';
import { ClickColorDirective } from './directives/click-color.directive';
import { AgreeDisagreeComponent } from './components/agree-disagree/agree-disagree.component';
import { KycComponent } from './components/kyc/kyc.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    JourneyComponent,
    DynamicDirective,
    InactiveDirective,
    TncComponent,
    MobileNumberComponent,
    PincodeComponent,
    QuestionComponent,
    VideoPlayerComponent,
    LandingComponent,
    ClickColorDirective,
    AgreeDisagreeComponent,
    KycComponent,
    ThankYouComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
