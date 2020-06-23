import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http'; 
import { YoutubeService } from '../youtube.service';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

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
      .getVideosForChannel('UC0gUrbt-AYy9RVkK9qjMJFw', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }
      });
  }
}
