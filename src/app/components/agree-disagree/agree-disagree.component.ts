import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';

@Component({
  selector: 'app-agree-disagree',
  templateUrl: './agree-disagree.component.html',
  styleUrls: ['./agree-disagree.component.css'],
})
export class AgreeDisagreeComponent implements OnInit {
  data: any;
  disableInputs = false;
  showMessage = false;
  whichTimeUser!: number;
  language: any;
  languageType: any;
  constructor(
    private apiService: ApiService,
    private journeyServie: JourneyService
  ) {}

  languages = [
    {},
    {
      receivingReminder:
        'आप हमारे साथ संपर्क में रह सकते हैं या रिमाइंडर एसएमएस प्राप्त करने से ऑप्ट आउट कर सकते हैं और किसी भी समय india.connects@pernod-ricard.com पर हमसे संपर्क करके कंसेंट विथड्रॉ कर सकते हैं। अधिक जानकारी के लिए, कृपया हमारी ऑनलाइन प्राइवेसी पॉलिसी देखें - ',
      option1: 'सहमत',
      option2: 'असहमत',
      offerAvailable:
        'ऑफर सीमित समय के लिए ही उपलब्ध है। ग्रैंड प्राइज जीतने का मौका पाने के लिए सभी 4 मार्क ऑफ प्यूरिटी बैज इकट्ठा करें। जल्द ही फिर मिलेंगे!',
      seeyousoon: 'फिर मिलेंगे! बाय',
    },
    {
      receivingReminder:
        'You can be in touch with us or Opt out of receiving Reminder SMS & withdraw your consent at any time by contacting us at india.connects@pernod-ricard.com. For further information, please consult our Online Privacy Policy - ',
      option1: 'Agree',
      option2: 'Disagree',
      offerAvailable:
        'Offer available for limited period only. Collect all 4 Mark of Purity Badges to get a chance to win the Grand Prize. See you soon!',
      seeyousoon: 'See you Soon!',
    },
    {
      receivingReminder:
        'మీరు మాతో టచ్ లో ఉండవచ్చు లేదా రిమైండర్ ఎస్ ఎం ఎస్ పొందేందుకు ఎంచుకోవచ్చు. మీ సమ్మతిని ఉపసంహరించుకునేందుకు ఎప్పుడైనా సరే మీరు మమ్మల్ని india.connects@pernod-ricard.com వద్ద సంప్రదించవచ్చు. తదనంతర సమాచారం కొరకు, దయచేసి మా ఆన్లైన్ ప్రైవసీ పాలసీని సంప్రదించండి - ',
      option1: 'అంగీకరిస్తున్నాను',
      option2: 'నిరాకరిస్తున్నాను',
      offerAvailable:
        'పరిమిత సమయం వరకు మాత్రమే ఆఫర్ అందుబాటులో ఉంటుంది. మార్క్ ఆఫ్ ప్యూరిటీ వారి 4 బ్యాడ్జీలను సేకరించి. గ్రాండ్ ప్రైజ్ గెలుచుకునే అవకాశం పొందండి. త్వరలో కలుద్దాం.',
      seeyousoon: 'త్వరలో కలుద్దాం.',
    },
  ];

  ngOnInit(): void {
    this.whichTimeUser = this.journeyServie.whichTimeUser;
    this.languageType = this.apiService.languageType;
    this.language = this.languages[this.languageType];
    this.proceed();
    this.updateScrollContent();
  }

  updateScrollContent() {
    let scrollContent: any = document.getElementById('scrollcontent');
    setTimeout(() => {
      scrollContent.scrollTop = scrollContent?.scrollHeight;
    }, 200);
  }

  async proceed() {
    await this.apiService.setFlagForSms(true);
    this.showMessage = true;
  }
}
