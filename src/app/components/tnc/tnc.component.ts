import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';
import { DynamicComponent } from '../dynamic.component';
import { MobileNumberComponent } from '../mobile-number/mobile-number.component';
import { PincodeComponent } from '../pincode/pincode.component';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.css'],
})
export class TncComponent implements DynamicComponent {
  showEndMessage = false;
  disableInputs = false;
  data: any;
  languageType!: any;
  language!: any;
  whichTimeUser!: any;

  languages = [
    {},
    {
      firstPara:
        'नमस्ते ,आप से मिल के अच्छा लगा। कृपया कन्फर्म करें कि आप शराब पीने की कानूनी उम्र के हैं और रॉयल स्टैग - मार्क ऑफ प्योरिटी प्रमोशन के नियम और शर्ते देखने के लिए यहां ',
      button: 'क्लिक करें।',
      endPara: 'अगर आप इसे स्वीकार करते हैं तो सहमत पर क्लिक करें।',
      option1: 'सहमत',
      option2: 'असहमत',
      endMessage:
        'रॉयल स्टैग - मार्क ऑफ प्योरिटी प्रमोशन में आपकी रुचि  के लिए धन्यवाद। आपको शराब पीने की कानूनी उम्र का होना चाहिए और भाग लेने के लिए आगे बढ़ने के लिए प्रमोशन के नियमों और शर्तों से सहमत होना चाहिए।   फिर से कोशिश करने के लिए  क्यूआर कोड को स्कैन करें या 8291829134 पर मिस्ड कॉल दें',
    },
    {
      firstPara:
        'Hi, Nice to see you. Kindly confirm that you are of Legal Drinking Age &',
      button: 'Click here',
      endPara:
        'to view the Royal Stag - Mark of Purity Promotion T&C. Click on Agree if you accept the same.',
      option1: 'Agree',
      option2: 'Disagree',
      endMessage:
        'Thank you for your interest in Royal Stag - Mark of Purity Promotion. You have to be of legal drinking age & agree to the Terms & Conditions of the Promotion to move forward to participate. Scan the QR Code or Give a Missed Call on 8291829134 to Try again',
    },
    {
      firstPara:
        'నమస్కారం, బాగున్నారా, మీరు చట్ట ప్రకారం డ్రింక్ చేయడానికి కావలసిన వయస్సు గల వారేనా అన్నది దయచేసి నిర్ధారించి, రాయల్ స్టాగ్ - మార్క్ ఆఫ్ ప్యూరిటీ ప్రమోషన్ చూసేందుకు',
      button: 'ఇక్కడ క్లిక్ చేయండి,',
      endPara:
        ' షరతులు వర్తిస్తాయి. మీరు దానికి ఆమోదిస్తున్నట్లైతే, అంగీకరిస్తున్నాను మీద క్లిక్ చేయండి.',
      option1: 'అంగీకరిస్తున్నాను',
      option2: 'నిరాకరిస్తున్నాను',
      endMessage:
        'రాయల్ స్టాగ్ - మార్క్ ఆఫ్ ప్యూరిటీ ప్రమోషన్ మీద ఆసక్తి చూపినందుకు మీకు ధన్యవాదాలు. ఇందులో పాల్గొనేందుకు కొనసాగాలంటే ముందుగా మీరు చట్ట ప్రకారం డ్రింక్ చేయడానికి కావలసిన వయస్సు కలిగి ఉండి, ప్రమోషన్ యొక్క నియమ నిబంధనలకు అంగీరించవలసి ఉంటుంది. క్యూఆర్ కోడ్ స్కాన్ చేయండి లేదా 8291829134 కు మిస్డ్ కాల్ ఇచ్చి మళ్ళీ ప్రయత్నించండి.',
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

  async proceed() {
    this.disableInputs = true;
    this.journeyServie.addComponent(PincodeComponent);
    this.updateScrollContent();
    const data = await this.apiService.setFlagForTermsAndConditions();
    console.log(data);
  }

  async end() {
    this.disableInputs = true;
    this.showEndMessage = true;
    this.updateScrollContent();
    const data = await this.apiService.setFlagForTermsAndConditions();
  }
}
