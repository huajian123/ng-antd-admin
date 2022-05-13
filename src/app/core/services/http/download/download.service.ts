import {Inject, Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {BaseHttpService} from "@services/base-http.service";
import {Menu} from "@core/services/types";
export interface DownLoadObj {
  downloadUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(public http: BaseHttpService)  {

  }

  public fileStreamDownload(downloadDto: DownLoadObj): Observable<string> {
    return this.http.downZip('/file/download/document',downloadDto, {needSuccessInfo: false});
  }

}
