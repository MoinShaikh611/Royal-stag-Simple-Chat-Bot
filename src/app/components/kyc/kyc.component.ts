import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
})
export class KycComponent implements OnInit {
  mobileNumber = '';
  isMobileNumberValid = false;
  proofList: any;
  proofListSelected = 'ADDRESS-VOTER';
  isSubmit = false;
  front: any;
  back: any;
  submited: any;
  picture: any;
  panPicture: any;
  address: any;
  backaddress: any;
  AddImage = true;
  ImageName = '';
  AddPanImage = true;
  PanImageName = '';
  AddAnyImage = true;
  AnyImageName = '';
  AddAnyBackImage = true;
  AnyBackImageName = '';
  isLoader = false;

  // validation
  invalidMobile = false;
  nullMobile = false;

  nullPicture = false;

  nullPan = false;

  nullAddress = false;

  nullBackAddress = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.proofList = [
      { id: 'ADDRESS-VOTER', value: 'Voter Id' },
      { id: 'ADDRESS-AADHAR', value: 'Adhaar Card' },
      { id: 'ADDRESS-PASSPORT', value: 'Passport' },
    ];
    this.proofListSelected = 'ADDRESS-VOTER';
    this.apiService.proofType = this.proofListSelected;
    this.front = document.getElementById('upload-address');
    this.back = document.getElementById('upload-address-back');
  }

  onProofChange(event: any) {
    this.apiService.proofType = event;
  }

  validateMobileNumber() {
    this.isMobileNumberValid = /\d{10}/.test(this.mobileNumber);
    if (this.isMobileNumberValid == true) {
      this.apiService.kycMobileNumber = this.mobileNumber;
      this.invalidMobile = false;
    } else {
      this.nullMobile = false;
      this.invalidMobile = true;
    }
  }

  async onPictureChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.picture = fileList[0];
    }
    this.ImageName = this.picture.name;
    this.AddImage = false;
    this.nullPicture = false;
  }

  async onPanChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.panPicture = fileList[0];
    }
    this.PanImageName = this.panPicture.name;
    this.AddPanImage = false;
    this.nullPan = false;
  }

  onAddressChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.address = fileList[0];
    }
    this.AnyImageName = this.address.name;
    this.AddAnyImage = false;
    this.nullAddress = false;
  }

  onAddressBackChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.backaddress = fileList[0];
    }

    this.AnyBackImageName = this.backaddress.name;
    this.AddAnyBackImage = false;
    this.nullBackAddress = false;
  }

  async onSubmitApi(event: any) {
    if (
      this.mobileNumber == '' &&
      this.picture == undefined &&
      this.panPicture == undefined &&
      this.address == undefined
    ) {
      this.isSubmit = true;
      this.nullMobile = true;
      this.nullPicture = true;
      this.nullPan = true;
      this.nullAddress = true;
      console.log('ple fill all');
    } else if (this.mobileNumber == '') {
      this.nullMobile = true;
    } else if (this.picture == undefined) {
      this.nullPicture = true;
    } else if (this.panPicture == undefined) {
      this.nullPan = true;
    } else if (this.address == undefined) {
      this.nullAddress = true;
    } else {
      this.isSubmit = false;
      event.target.disabled = true;
      const pictureData = await this.apiService.uploadPicture(
        this.picture,
        this.picture.name
      );

      const panData = await this.apiService.uploadPan(
        this.panPicture,
        this.panPicture.name
      );

      const addressData = await this.apiService.uploadAddress(
        this.address,
        this.address.name
      );

      if (this.backaddress != undefined) {
        const backAddressData = await this.apiService.uploadBackAddress(
          this.backaddress,
          this.backaddress.name
        );
      }

      this.isLoader = true;
      setTimeout(() => {
        this.router.navigate(['/thank-you']);
      }, 3000);
    }
  }
}
