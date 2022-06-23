import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, pipe } from 'rxjs';
import { Project } from './models/project';
import { ApiUrl } from './models/config';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _http: HttpClient,
  ) { }

  getHeaders(): any {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    return ({ headers: headers });
  }

  testService() {
    return "Provando el servicio de angular"
  }

  postProject(project:Project): Observable<any> {
    let params = JSON.stringify(project)

    return this._http.post(ApiUrl + "/save-project", params, this.getHeaders()).pipe(
      map((response: any) => {
        if (response.status) {
          return { print: response.data, valid: response.status };
        }else{
          return { print: response.message, valid: response.status };
        }
      })
    )
  }
}
