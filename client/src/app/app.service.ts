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

  getProjects(): Observable<any> {
    return this._http.get(ApiUrl + "/projects", this.getHeaders()).pipe(
      map((response:any) =>{
        if (response.status){
          return {print: response.data, valid: true}
        }else{
          return {print: response.data, valid: false}
        }
      })
    );
  }

  prueba(): Observable<any> {
    return this._http.get('https://hjbcw66tkj.execute-api.us-east-1.amazonaws.com/dev/', this.getHeaders()).pipe(
      
      map((response:any) =>{
        console.log("Response", response)
      })
    );
  }


  makeFileRequest(id: number, params: string, files: Array<File>, name: string) {
    return new Promise ((resolve, reject) =>{
      var formData = new FormData();
      var xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4){
          if (xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          }else{
            reject(xhr.response)
          }
        }
      }

      let url = `${ApiUrl}/upload-image/${id}`

      xhr.open('POST', url, true)
      xhr.send(formData)

    })
  }

}
