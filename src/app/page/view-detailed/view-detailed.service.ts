import { inject, Injectable } from "@angular/core";
import { PiratflixServiceService } from "../../service/piratflix.service";
import { Observable } from "rxjs";
import { Media } from "../../model/imovie-and-serie";
import { Video } from "../../model/video";

@Injectable({
  providedIn: "root"
})
export class ViewDetailedService {
  pirateFlixService: PiratflixServiceService = inject(PiratflixServiceService)

  public getMediaContent(type: string, id: string):Observable<Media>{
    return this.pirateFlixService.get<Media>(`/${type}/${id}`);
  }

  public getVideo(type: string, id: string): Observable<Video> {
    return this.pirateFlixService.get(`/${type}/${id}/videos`);
  }
}
