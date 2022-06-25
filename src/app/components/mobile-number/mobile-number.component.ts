import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';
import { DynamicComponent } from '../dynamic.component';
import { PincodeComponent } from '../pincode/pincode.component';
import { QuestionComponent } from '../question/question.component';
import { TncComponent } from '../tnc/tnc.component';

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.css'],
})
export class MobileNumberComponent implements DynamicComponent {
  data: any;

  mobileNumber = '';
  isMobileNumberValid = false;
  showNumberBubble = false;
  endMessage = false;
  enableAfterFourthTime = false;
  languageType!: any;
  language!: any;

  @ViewChild('sendSvgImage') sendSvgImage!: ElementRef;
  dataMessage: any;
  whichTimeUser: any;

  constructor(
    private journeyServie: JourneyService,
    private apiService: ApiService
  ) {}

  languages = [
    {},
    {
      kindlyEnter: 'कृपया अपना मोबाइल नंबर दर्ज करें',
      tryTommorow:
        'नमस्ते, आपके  आज के प्रयासों की संख्या समाप्त हो चुकी  है। कल फिर प्रयास करें',
      afterFourBadges:
        'आपने सभी चार रॉयल स्टैग मार्क ऑफ़ प्योरिटी बैज इकठ्ठा कर लिए हैं और आपकी यह एंट्री अब ग्रैंड प्राइज़ लकी ड्रा के लिए योग्य है',
      byePara: 'फिर मिलेंगे! बाय',
    },
    {
      kindlyEnter: 'Kindly enter your Mobile Number',
      tryTommorow:
        'Hey, you have exhausted the number of attempts for today. Try again tomorrow',
      afterFourBadges:
        'You have collected all 4 Royal Stag mark of Purity Badges and your entry is now eligible for the Grand Prize Lucky Draw',
      byePara: 'See you around! Bye!',
    },
    {
      kindlyEnter: 'దయచేసి మీ మొబైల్ నెంబరును ఎంటర్ చేయండి',
      tryTommorow:
        'నమస్కారం, ఇవాల్టికి మీ అటెంప్ట్ లు అయిపోయాయి. రేపు మళ్ళీ ప్రయత్నించండి',
      afterFourBadges:
        'మీరు 4 రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీలని సేకరించారు. ఇక మీరు గ్రాండ్ ప్రైజ్ లక్కీ డ్రా కోసం అర్హత సంపాదించారు.',
      byePara: 'కలుద్దాం, బై బై!',
    },
  ];
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

  proceedForQuestionComponent() {
    this.journeyServie.addComponent(QuestionComponent);
    this.updateScrollContent();
  }

  proceedForTnC() {
    this.journeyServie.addComponent(TncComponent);
    this.updateScrollContent();
  }

  end() {
    this.updateScrollContent();
  }

  validateMobileNumber() {
    this.isMobileNumberValid = /\d{10}/.test(this.mobileNumber);
    if (this.isMobileNumberValid) {
      this.sendSvgImage.nativeElement.style.filter = 'none';
    } else {
      this.sendSvgImage.nativeElement.style.filter =
        'invert(46%) sepia(99%) saturate(2%) hue-rotate(36deg) brightness(90%) contrast(93%)';
    }
  }

  async sendNumber() {
    let data = await this.apiService.checkMobile(this.mobileNumber);
    this.journeyServie.whichTimeUser = data.attempt;
    this.whichTimeUser = data.attempt;
    this.showNumberBubble = true;
    console.log(this.whichTimeUser);

    if (data.allow == true) {
      if (data.attempt > 1 && data.attempt < 5) {
        this.endMessage = false;
        this.proceedForQuestionComponent();
      } else {
        this.proceedForTnC();
      }
    } else {
      if (data.attempt > 1 && data.attempt < 5) {
        this.endMessage = true;
        this.end();
      }
    }
  }
}
