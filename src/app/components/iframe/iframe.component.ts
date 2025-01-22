import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  imports: [CommonModule],
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css'],
  standalone: true
})
export class IframeComponent implements OnChanges {
  @Input() videoId!: string;
  safeUrl: SafeResourceUrl | null = null;
  sanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoId'] && this.videoId) {
      const videoUrl =`https://www.youtube-nocookie.com/embed/${this.videoId}?rel=0&controls=0`
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
  }
}
