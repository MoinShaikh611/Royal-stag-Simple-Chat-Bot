import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';
import { DynamicComponent } from '../dynamic.component';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css'],
})
export class PincodeComponent implements DynamicComponent {
  disableInputs = false;
  data: any;

  pinCode = '';
  isPinCodeValid = false;
  showPinCodeBubble = false;
  @ViewChild('sendSvgImage') sendSvgImage!: ElementRef;

  languageType!: any;
  language!: any;

  pinCodeSet = new Set([]);

  languages = [
    {},
    {
      kindlyEnterPincode: 'कृपया अपना पिनकोड दर्ज करें',
      invalidPincode:
        'आपके द्वारा दर्ज किया गया पिनकोड मान्य नहीं है। कृपया मान्य पिनकोड दर्ज करें',
    },
    {
      kindlyEnterPincode: 'Kindly enter your Pincode',
      invalidPincode:
        'The pincode you have provided is not valid. Kindly enter a valid pincode',
    },
    {
      kindlyEnterPincode: 'దయచేసి మీ పిన్ కోడ్ ను ఎంటర్ చేయండి',
      invalidPincode:
        'మీరు ఎంటర్ చేసిన పిన్ కోడ్ సరైనది కాదు. దయచేసి సరైన పిన్ కోడ్ ఎంటర్ చేయండి',
    },
  ];

  constructor(
    private journeyServie: JourneyService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (this.apiService.languageType === undefined) {
      this.languageType = 2;
    } else {
      this.languageType = this.apiService.languageType;
    }
    this.language = this.languages[this.languageType];
  }

  updateScrollContent() {
    let scrollContent: any = document.getElementById('scrollcontent');
    setTimeout(() => {
      scrollContent.scrollTop = scrollContent?.scrollHeight;
    }, 200);
  }
  proceed() {
    this.disableInputs = true;
    this.journeyServie.addComponent(QuestionComponent);
    this.updateScrollContent();
    this.apiService.pinCodeNumber = this.pinCode;
  }

  loop() {
    this.disableInputs = true;
    this.journeyServie.addComponent(PincodeComponent, { loop: true });
    this.updateScrollContent();
  }

  validatePinCode() {
    this.isPinCodeValid = /\d{6}/.test(this.pinCode);
    if (this.isPinCodeValid) {
      this.sendSvgImage.nativeElement.style.filter = 'none';
    } else {
      this.sendSvgImage.nativeElement.style.filter =
        'invert(46%) sepia(99%) saturate(2%) hue-rotate(36deg) brightness(90%) contrast(93%)';
    }
  }

  async sendPinCode() {
    this.showPinCodeBubble = true;
    this.updateScrollContent();
    const data = await this.apiService.checkPincode(this.pinCode);
    if (data.isValid == true) {
      this.proceed();
    } else {
      this.loop();
    }
  }
}
