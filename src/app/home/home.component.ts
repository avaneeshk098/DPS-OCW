import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from '../youtube.service';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videos: any[];
  private unsubscribe$: Subject<any> = new Subject();

  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(()=>
    {
      this.spinner.hide()
    },3000)
    this.videos = [];
    this.youTubeService
      .getVideosForChannel('UC_LtA_EtCr7Jp5ofOsYt18g', 3)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }

      });
  }
}
