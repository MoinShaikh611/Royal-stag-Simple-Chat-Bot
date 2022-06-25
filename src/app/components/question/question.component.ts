import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';
import { AgreeDisagreeComponent } from '../agree-disagree/agree-disagree.component';
import { DynamicComponent } from '../dynamic.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, DynamicComponent {
  data: any;
  disableInputs = false;
  showEndMessage = false;
  showProceedMessage = false;
  whichTimeUser!: number;
  question: any = null;
  correctValue: any;
  newLine: any = '';
  priceForUser!: number;
  languageType = 2;
  msgToParent = false;

  constructor(
    private journeyService: JourneyService,
    private apiService: ApiService
  ) {}

  languages = [
    [],
    [
      {},
      {
        question: 'रॉयल स्टैग व्हिस्की कितने गुणवत्ता जांचों से गुजरती है?',
        option1: { value: '20+', correct: false },
        option2: { value: '50+', correct: true },
        winningMsg:
          'आपने रॉयल स्टैग - मार्क ऑफ प्योरिटी बैज का पहला  मार्क अनलॉक कर दिया है। वीडियो देखने के लिए क्लिक करें और जीतने के लिए सवाल का जवाब दें',
        remainingMsg:
          'आपके पास 3 और मौके है रॉयल स्टैग ऑफ़ प्यूरिटी बैज को अनलॉक करने के लिए । जल्द ही प्राप्त करें!',
        congratsReceiveSMS:
          'बधाई हो । आपने इसका सही उत्तर दिया है | आपने एक डिजिटल वाउचर जीता है, और २४ घंटे के अंदर आपको एक एसएमएस भेजा जाएगा | ',
        incorrectAnswer:
          'आपका उत्तर गलत था | रॉयल स्टैग - मार्क ऑफ प्योरिटी प्रमोशन में आपकी रूचि  के लिए धन्यवाद।  फिर से कोशिश करने के लिए  क्यूआर कोड को स्कैन करें या 8291829134 पर मिस्ड कॉल दें',
      },
      {
        question: 'रॉयल स्टैग व्हिस्की में है:',
        option1: {
          value: 'बिना कृत्रिम स्वाद की प्रामाणिकता',
          correct: true,
        },
        option2: { value: 'मुझे नहीं पता', correct: false },
        winningMsg:
          'आपने रॉयल स्टैग - मार्क ऑफ प्योरिटी बैज का दूसरा मार्क अनलॉक कर दिया है। वीडियो देखने के लिए क्लिक करें और जीतने के लिए सवाल का जवाब दें',
        remainingMsg:
          'आपके पास अनलॉक करने के लिए प्योरिटी बैज के 2 और रॉयल स्टैग मार्क बाकी हैं। उन्हें जल्द ही प्राप्त करें!',
        congratsReceiveSMS:
          'बधाई हो । आपने इसका सही उत्तर दिया है | आपने एक डिजिटल वाउचर जीता है, और २४ घंटे के अंदर आपको एक एसएमएस भेजा जाएगा | ',
        incorrectAnswer:
          'आपका उत्तर गलत था | रॉयल स्टैग - मार्क ऑफ प्योरिटी प्रमोशन में आपकी रूचि  के लिए धन्यवाद।  फिर से कोशिश करने के लिए  क्यूआर कोड को स्कैन करें या 8291829134 पर मिस्ड कॉल दें',
      },
      {
        question:
          ' रॉयल स्टैग व्हिस्की में माल्ट कितने बैरल में मच्योर होते हैं:',
        option1: { value: 'एक बैरल', correct: false },
        option2: { value: 'ट्रिपल बैरल', correct: true },
        winningMsg:
          'आपने रॉयल स्टैग - मार्क ऑफ प्योरिटी बैज का तीसरे मार्क अनलॉक कर दिया है। वीडियो देखने के लिए क्लिक करें और जीतने के लिए सवाल का जवाब दें',
        remainingMsg:
          'आपके पास अनलॉक करने के लिए प्योरिटी बैज के 1 और रॉयल स्टैग मार्क बाकी  हैं। उन्हें जल्द ही प्राप्त करें!',
        congratsReceiveSMS:
          'बधाई हो । आपने इसका सही उत्तर दिया है | आपने एक डिजिटल वाउचर जीता है, और २४ घंटे के अंदर आपको एक एसएमएस भेजा जाएगा | ',
        incorrectAnswer:
          'आपका उत्तर गलत था | रॉयल स्टैग - मार्क ऑफ प्योरिटी प्रमोशन में आपकी रूचि  के लिए धन्यवाद।  फिर से कोशिश करने के लिए  क्यूआर कोड को स्कैन करें या 8291829134 पर मिस्ड कॉल दें',
      },
      {
        question: 'रॉयल स्टैग व्हिस्की में है:',
        option1: {
          value: `बेहतरीन स्कॉच माल्ट चुनिंदा भारतीय अनाज स्पिरिट के साथ मिश्रित`,
          correct: true,
        },
        option2: { value: 'मुझे मालूम नहीं', correct: false },
        winningMsg:
          'आपने रॉयल स्टैग - मार्क ऑफ प्योरिटी बैज का चौथा मार्क अनलॉक कर दिया है। वीडियो देखने के लिए क्लिक करें और जीतने के लिए सवाल का जवाब दें',
        remainingMsg:
          'आपने सभी चार रॉयल स्टैग मार्क ऑफ़ प्योरिटी बैज इकठ्ठा कर लिए हैं और आपका प्रवेश अब ग्रैंड प्राइज़ लकी ड्रा के लिए योग्य है',
        congratsReceiveSMS:
          'बधाई हो । आपने इसका सही उत्तर दिया है | आपने एक डिजिटल वाउचर जीता है, और २४ घंटे के अंदर आपको एक एसएमएस भेजा जाएगा | ',
        incorrectAnswer:
          'आपका उत्तर गलत था | रॉयल स्टैग - मार्क ऑफ प्योरिटी प्रमोशन में आपकी रूचि  के लिए धन्यवाद।  फिर से कोशिश करने के लिए  क्यूआर कोड को स्कैन करें या 8291829134 पर मिस्ड कॉल दें',
      },
    ],
    [
      {},
      {
        question: 'Royal Stag whisky goes through how many quality checks?',
        option1: { value: '20+', correct: false },
        option2: { value: '50+', correct: true },
        winningMsg:
          'You have unlocked the 1st Royal Stag Mark of Purity Badge. Click to watch the video and answer the question to win an instant Digital Voucher',
        remainingMsg:
          'You have 3 more Royal Stag Mark of Purity Badges to be unlocked. Get them soon!',
        congratsReceiveSMS:
          'Congratulation. You have answered it correctly. You have won a digital voucher and will receive an SMS within 24 hours.',
        incorrectAnswer:
          'Your answer was incorrect. Thank you for your interest in Royal Stag - Mark of Purity Promotion. Scan the QR Code or Give a Missed Call on 8291829134 to Try again',
      },
      {
        question: 'Royal Stag whisky has:',
        option1: {
          value: 'Authenticity of No Artificial Flavours',
          correct: true,
        },
        option2: { value: "I don't know", correct: false },
        winningMsg:
          'You have unlocked the 2nd Royal Stag Mark of Purity Badge. Click to watch the video and answer the question to win an instant Digital Voucher',
        remainingMsg:
          'You have 2 more Royal Stag Mark of Purity Badges to be unlocked. Get them soon!',
        congratsReceiveSMS:
          'Congratulation. You have answered it correctly. You have won a digital voucher and will receive an SMS within 24 hours.',
        incorrectAnswer:
          'Your answer was incorrect. Thank you for your interest in Royal Stag - Mark of Purity Promotion. Scan the QR Code or Give a Missed Call on 8291829134 to Try again',
      },
      {
        question: 'Malts in Royal Stag whisky are matured in:',
        option1: { value: 'One Barrel', correct: false },
        option2: { value: 'Triple Barrels', correct: true },
        winningMsg:
          'You have unlocked the 3rd Royal Stag Mark of Purity Badge. Click to watch the video and answer the question to win an instant Digital Voucher',
        remainingMsg:
          'You have 1 more Royal Stag Mark of Purity Badges to be unlocked. Get them soon!',
        congratsReceiveSMS:
          'Congratulation. You have answered it correctly. You have won a digital voucher and will receive an SMS within 24 hours.',
        incorrectAnswer:
          'Your answer was incorrect. Thank you for your interest in Royal Stag - Mark of Purity Promotion. Scan the QR Code or Give a Missed Call on 8291829134 to Try again',
      },
      {
        question: 'Royal Stag whisky has:',
        option1: {
          value: `Finest Scotch Malts Blended with Select Indian Grain Spirits`,
          correct: true,
        },
        option2: { value: "I don't know", correct: false },
        winningMsg:
          'You have unlocked the 4th Royal Stag Mark of Purity Badge. Click to watch the video and answer the question to win an instant Digital Voucher',
        remainingMsg:
          'You have collected all 4 Royal Stag mark of Purity Badges and your entry is now eligible for the Mega Prize Lucky Draw',
        congratsReceiveSMS:
          'Congratulation. You have answered it correctly. You have won a digital voucher and will receive an SMS within 24 hours.',
        incorrectAnswer:
          'Your answer was incorrect. Thank you for your interest in Royal Stag - Mark of Purity Promotion. Scan the QR Code or Give a Missed Call on 8291829134 to Try again',
      },
    ],
    [
      {},
      {
        question: 'రాయల్ స్టాగ్ విస్కీ పై ఎన్ని క్వాలిటీ చెక్స్ చేయబడతాయి?',
        option1: { value: '20+', correct: false },
        option2: { value: '50+', correct: true },
        winningMsg:
          'మీరు 1వ రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీని అన్ లాక్ చేశారు. వీడియోను చూడటానికి క్లిక్ చేయండి మరియు గెలవడానికి ప్రశ్నకు సమాధానం ఇవ్వండి',
        remainingMsg:
          'మీరు ఇంకో 3 రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీలు అన్ లాక్ చేసుకోవలసి ఉంది. వాటిని త్వరగా పొందండి.',
        congratsReceiveSMS:
          'అభినందనలు. మీరు సరైన సమాధానం ఇచ్చారు. మీరు డిజిటల్ ఔచర్ గెలుచుకున్నారు, 24 గంటల్లో మీకు ఒక ఎస్ ఎమ్ ఎస్ వస్తుంది',
        incorrectAnswer:
          'మీ సమాధానం సరైనది కాదు. రాయల్ స్టాగ్ - మార్క్ ఆఫ్ ప్యూరిటీ ప్రమోషన్ మీద ఆసక్తి చూపినందుకు మీకు ధన్యవాదాలు. క్యూఆర్ కోడ్ స్కాన్ చేయండి లేదా 8291829134 కు మిస్డ్ కాల్ ఇచ్చి మళ్ళీ ప్రయత్నించండి.',
      },
      {
        question: 'రాయల్ స్టాగ్ విస్కీ లో ఉండేవి :',
        option1: {
          value: 'ఎటువంటి ఆర్టిఫిషియల్ ఫ్లేవర్లు ఉండవు అన్న నిజం',
          correct: true,
        },
        option2: { value: 'నాకు తెలీదు', correct: false },
        winningMsg:
          'మీరు 2వ రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీని అన్ లాక్ చేశారు. వీడియోను చూడటానికి క్లిక్ చేయండి మరియు గెలవడానికి ప్రశ్నకు సమాధానం ఇవ్వండి',
        remainingMsg:
          'మీరు ఇంకో 2 రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీలు అన్ లాక్ చేసుకోవలసి ఉంది. వాటిని త్వరగా పొందండి.',
        congratsReceiveSMS:
          'అభినందనలు. మీరు సరైన సమాధానం ఇచ్చారు. మీరు డిజిటల్ ఔచర్ గెలుచుకున్నారు, 24 గంటల్లో మీకు ఒక ఎస్ ఎమ్ ఎస్ వస్తుంది',
        incorrectAnswer:
          'మీ సమాధానం సరైనది కాదు. రాయల్ స్టాగ్ - మార్క్ ఆఫ్ ప్యూరిటీ ప్రమోషన్ మీద ఆసక్తి చూపినందుకు మీకు ధన్యవాదాలు. క్యూఆర్ కోడ్ స్కాన్ చేయండి లేదా 8291829134 కు మిస్డ్ కాల్ ఇచ్చి మళ్ళీ ప్రయత్నించండి.',
      },
      {
        question:
          'రాయల్ స్టాగ్ విస్కీ లో ఉండే మాల్ట్ దేనిలో మెచూర్ చేయబడతాయి :',
        option1: { value: 'ఒక బ్యారెల్', correct: false },
        option2: { value: 'ట్రిపుల్ బ్యారెల్స్', correct: true },
        winningMsg:
          'మీరు 3వ రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీని అన్ లాక్ చేశారు. వీడియోను చూడటానికి క్లిక్ చేయండి మరియు గెలవడానికి ప్రశ్నకు సమాధానం ఇవ్వండి',
        remainingMsg:
          'మీరు ఇంకో 1 రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీని అన్ లాక్ చేసుకోవలసి ఉంది. వాటిని త్వరగా పొందండి.',
        congratsReceiveSMS:
          'అభినందనలు. మీరు సరైన సమాధానం ఇచ్చారు. మీరు డిజిటల్ ఔచర్ గెలుచుకున్నారు, 24 గంటల్లో మీకు ఒక ఎస్ ఎమ్ ఎస్ వస్తుంది',
        incorrectAnswer:
          'మీ సమాధానం సరైనది కాదు. రాయల్ స్టాగ్ - మార్క్ ఆఫ్ ప్యూరిటీ ప్రమోషన్ మీద ఆసక్తి చూపినందుకు మీకు ధన్యవాదాలు. క్యూఆర్ కోడ్ స్కాన్ చేయండి లేదా 8291829134 కు మిస్డ్ కాల్ ఇచ్చి మళ్ళీ ప్రయత్నించండి.',
      },
      {
        question: 'రాయల్ స్టాగ్ విస్కీలో ఉండేవి :',
        option1: {
          value: `ఎంచుకున్న ఇండియన్ గ్రెయిన్ స్పిరిట్స్ తో బ్లెండ్ చేయబడిన అత్యుత్తమ స్కాచ్ మాల్ట్స్`,
          correct: true,
        },
        option2: { value: 'నాకు తెలీదు', correct: false },
        winningMsg:
          'మీరు 4వ రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీని అన్ లాక్ చేశారు. వీడియోను చూడటానికి క్లిక్ చేయండి మరియు గెలవడానికి ప్రశ్నకు సమాధానం ఇవ్వండి',
        remainingMsg:
          'మీరు 4 రాయల్ స్టాగ్ మార్క్ ఆఫ్ ప్యూరిటీ బ్యాడ్జీలని సేకరించారు. ఇక మీరు గ్రాండ్ ప్రైజ్ లక్కీ డ్రా కోసం అర్హత సంపాదించారు.',
        congratsReceiveSMS:
          'అభినందనలు. మీరు సరైన సమాధానం ఇచ్చారు. మీరు డిజిటల్ ఔచర్ గెలుచుకున్నారు, 24 గంటల్లో మీకు ఒక ఎస్ ఎమ్ ఎస్ వస్తుంది',
        incorrectAnswer:
          'మీ సమాధానం సరైనది కాదు. రాయల్ స్టాగ్ - మార్క్ ఆఫ్ ప్యూరిటీ ప్రమోషన్ మీద ఆసక్తి చూపినందుకు మీకు ధన్యవాదాలు. క్యూఆర్ కోడ్ స్కాన్ చేయండి లేదా 8291829134 కు మిస్డ్ కాల్ ఇచ్చి మళ్ళీ ప్రయత్నించండి.',
      },
    ],
  ];

  ngOnInit(): void {
    this.whichTimeUser = this.journeyService.whichTimeUser;
    if (this.apiService.languageType === undefined) {
      this.question = this.languages[this.languageType][this.whichTimeUser];
    } else {
      this.languageType = this.apiService.languageType;
      this.question = this.languages[this.languageType][this.whichTimeUser];
    }
  }

  updateScrollContent() {
    let scrollContent: any = document.getElementById('scrollcontent');
    setTimeout(() => {
      scrollContent.scrollTop = scrollContent?.scrollHeight;
    }, 200);
  }

  proceed() {
    this.disableInputs = true;
    this.journeyService.addComponent(AgreeDisagreeComponent);
    this.updateScrollContent();
  }

  async select(isCorrect: boolean) {
    this.disableInputs = true;
    this.updateScrollContent();

    const data = await this.apiService.setFlagForIsCorrectAswer(isCorrect);

    if (isCorrect == true) {
      this.showProceedMessage = true;
      this.proceed();
    } else {
      this.showEndMessage = true;
    }
  }
}
