import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  disableInputs = true;
  source:any
  constructor(private router: Router, private apiService: ApiService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.source = params.source;
        if(this.source === "qrcode"){
          this.apiService.registrationSrc = "QR"
        }else{
          this.apiService.registrationSrc = "CALL"
        }
      }
    );
  }

  @ViewChild('hindiBg') hindiBg!: ElementRef;
  @ViewChild('englishBg') englishBg!: ElementRef;
  @ViewChild('teluguBg') teluguBg!: ElementRef;

  @ViewChild('hindiColor') hindiColor!: ElementRef;
  @ViewChild('englishColor') englishColor!: ElementRef;
  @ViewChild('teluguColor') teluguColor!: ElementRef;

  gotoJourney() {
    this.router.navigate(['/journey']);
  }

  changeToHindi() {
    localStorage.setItem('languageType', '1');
    localStorage.setItem('languageName', 'HINDI');

    this.apiService.languageType = 1;
    this.disableInputs = false;
    this.apiService.languageName = 'HINDI';
    this.hindiBg.nativeElement.style.background = '#7e1615';
    this.hindiBg.nativeElement.style.border = '1px solid white';
    this.hindiColor.nativeElement.style.color = '#ffffff';

    this.englishBg.nativeElement.style.background = '';
    this.englishBg.nativeElement.style.border = 'none';
    this.englishColor.nativeElement.style.color = '';

    this.teluguBg.nativeElement.style.background = '';
    this.teluguBg.nativeElement.style.border = 'none';
    this.teluguColor.nativeElement.style.color = '';
  }
  changeToEnglish() {
    localStorage.setItem('languageType', '2');
    localStorage.setItem('languageName', 'ENGLISH');

    this.apiService.languageType = 2;
    this.disableInputs = false;
    this.apiService.languageName = 'ENGLISH';
    this.hindiBg.nativeElement.style.background = '';
    this.hindiBg.nativeElement.style.border = 'none';
    this.hindiColor.nativeElement.style.color = '';

    this.englishBg.nativeElement.style.background = '#7e1615';
    this.englishBg.nativeElement.style.border = '1px solid white';
    this.englishColor.nativeElement.style.color = '#ffffff';

    this.teluguBg.nativeElement.style.background = '';
    this.teluguBg.nativeElement.style.border = 'none';
    this.teluguColor.nativeElement.style.color = '';
  }
  changeToTelugu() {
    localStorage.setItem('languageType', '3');
    localStorage.setItem('languageName', 'TELUGU');

    this.apiService.languageType = 3;
    this.disableInputs = false;
    this.apiService.languageName = 'TELUGU';
    this.hindiBg.nativeElement.style.background = '';
    this.hindiBg.nativeElement.style.border = 'none';
    this.hindiColor.nativeElement.style.color = '';

    this.englishBg.nativeElement.style.background = '';
    this.englishBg.nativeElement.style.border = 'none';
    this.englishColor.nativeElement.style.color = '';

    this.teluguBg.nativeElement.style.background = '#7e1615';
    this.teluguBg.nativeElement.style.border = '1px solid white';
    this.teluguColor.nativeElement.style.color = '#ffffff';
  }
}
