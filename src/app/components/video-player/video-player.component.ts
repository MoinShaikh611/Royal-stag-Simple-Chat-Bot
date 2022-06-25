import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JourneyService } from 'src/app/services/journey.service';
import { DynamicComponent } from '../dynamic.component';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit, DynamicComponent {
  data: any;
  whichTimeUser!: number;
  @Input() id: any;
  @Output() msgFunToParent = new EventEmitter<any>();

  isplay = true;
  ispaused = false;
  @ViewChild('playBtn') playBtn!: ElementRef;
  @ViewChild('pauseBtn') pauseBtn!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('video') video!: ElementRef;

  constructor(
    private journeyServie: JourneyService,
    private apiService: ApiService
  ) {}

  updateScrollContent() {
    let scrollContent: any = document.getElementById('scrollcontent');
    setTimeout(() => {
      scrollContent.scrollTop = scrollContent?.scrollHeight;
    }, 200);
  }
  ngOnInit(): void {
    this.whichTimeUser = this.journeyServie.whichTimeUser;
  }

  async clickOnce(value: boolean) {
    this.apiService.setFlagForVideo(value);
  }

  ontoggle() {
    this.ispaused = !this.ispaused;
    this.isplay = !this.isplay;
    this.isplay
      ? (this.overlay.nativeElement.style.visibility = 'visible')
      : (this.overlay.nativeElement.style.visibility = 'hidden');

    this.isplay
      ? this.video.nativeElement.pause()
      : this.video.nativeElement.play();
  }

  onVideoEnd() {
    this.overlay.nativeElement.style.visibility = 'visible';
    this.isplay = true;
    this.ispaused = false;
    this.msgFunToParent.emit();
  }
}
