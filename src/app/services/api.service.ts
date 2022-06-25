import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  mobileNumber!: string;
  batchCodeNumber!: string;
  pinCodeNumber!: string;
  priceForUser!: number;
  kycMobileNumber!: string;
  proofType: any;

  // new changes
  apiKey: string = environment.apiAkey;
  refId!: string;
  languageType: any = localStorage.getItem('languageType');
  languageName = localStorage.getItem('languageName');
  registrationSrc: any;

  constructor() {}

  async initializeRegistration() {
    const res = await fetch(`${environment.backendUrl}/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: 'y3qhlp3eiqdb2uu',
        src: this.registrationSrc,
        lang: this.languageName,
      }),
    });
    return await res.json();
  }

  async setFlagForLegalAge() {
    const res = await fetch(`${environment.backendUrl}/set-flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'HAVING_LEGAL_AGE',
        value: true,
      }),
    });
    return await res.json();
  }

  async setFlagForTermsAndConditions() {
    const res = await fetch(`${environment.backendUrl}/set-flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'ACCEPT_TERMS',
        value: true,
      }),
    });
    return await res.json();
  }

  async checkMobile(phoneNumber: any) {
    const res = await fetch(`${environment.backendUrl}/check-mobile`, {
      method: 'POST',
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        mobile: phoneNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  async checkPincode(pincode: any) {
    const res = await fetch(`${environment.backendUrl}/validate`, {
      method: 'POST',
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'PINCODE',
        value: pincode,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  async checkBatchCode(batchCode: any) {
    const res = await fetch(`${environment.backendUrl}/validate`, {
      method: 'POST',
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'BATCH',
        value: batchCode,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  async setFlagForVideo(value: boolean) {
    const res = await fetch(`${environment.backendUrl}/set-flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'WATCH_VIDEO',
        value: value,
      }),
    });
    return await res.json();
  }

  async setFlagForIsCorrectAswer(isCorrect: boolean) {
    const res = await fetch(`${environment.backendUrl}/set-flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'IS_CORRECT_ANS',
        value: isCorrect,
      }),
    });
    return await res.json();
  }

  async setFlagForSms(isCorrect: boolean) {
    const res = await fetch(`${environment.backendUrl}/set-flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        refID: this.refId,
        type: 'RECV_SMS',
        value: isCorrect,
      }),
    });
    return await res.json();
  }

  async uploadPicture(picture: any, pictureName: any) {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ASP.NET_SessionId=v3abm0d1jpgdk5mnomkripug');
    // myHeaders.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('file', picture);
    formData.append('mobile', this.kycMobileNumber);
    formData.append('type', 'PHOTO');
    formData.append('face', 'FRONT');
    formData.append('filename', pictureName);
    const res = await fetch(`https://backend.royalstagmop.com/upload-file`, {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    });
    return res.json();
  }

  async uploadAddress(address: any, addressName: any) {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ASP.NET_SessionId=v3abm0d1jpgdk5mnomkripug');
    // myHeaders.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('file', address);
    formData.append('mobile', this.kycMobileNumber);
    formData.append('type', this.proofType);
    formData.append('face', 'FRONT');
    formData.append('filename', addressName);
    const res = await fetch(`https://backend.royalstagmop.com/upload-file`, {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    });
    return res.json();
  }
  async uploadBackAddress(address: any, addressName: any) {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ASP.NET_SessionId=v3abm0d1jpgdk5mnomkripug');
    // myHeaders.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('file', address);
    formData.append('mobile', this.kycMobileNumber);
    formData.append('type', this.proofType);
    formData.append('face', 'BACK');
    formData.append('filename', addressName);
    const res = await fetch(`https://backend.royalstagmop.com/upload-file`, {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    });
    return res.json();
  }

  async uploadPan(pan: any, panName: any) {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ASP.NET_SessionId=v3abm0d1jpgdk5mnomkripug');
    // myHeaders.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('file', pan);
    formData.append('mobile', this.kycMobileNumber);
    formData.append('type', 'PAN');
    formData.append('face', 'FRONT');
    formData.append('filename', panName);
    const res = await fetch(`https://backend.royalstagmop.com/upload-file`, {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    });
    return res.json();
  }
}
