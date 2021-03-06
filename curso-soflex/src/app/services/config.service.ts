import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  api = "/curso-soflex_api/index.php/";
  server = '';
  user: any = {};

  constructor(private http: HttpClient) {
    this.server = 'http://localhost:8080' + this.api
  }

  getHeaders(){
    this.user = JSON.parse(localStorage.getItem("Authorization")!);
    let httpOptions = {};
    if(this.user){
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.user.token
        })
      };
    }
    return httpOptions;
  }

  get(url: string){
    return this.http.get(this.server + url, this.getHeaders()).pipe(catchError(this.handleError));
  }

  getById(url: string, id: number){
    return this.http.get(this.server + url + '/' + id, this.getHeaders()).pipe(catchError(this.handleError))
  }

  post(url:string, data: any){
    return this.http.post(this.server + url, data, this.getHeaders()).pipe(catchError(this.handleError))
  }

  put(url:string, id:number, data:any){
    return this.http.put(this.server + url + '/' + id, data, this.getHeaders()).pipe(catchError(this.handleError))
  }

  delete(url:string, id:number){
    return this.http.delete(this.server + url + '/' + id, this.getHeaders()).pipe(catchError(this.handleError))
  }

  public handleError(err: Response){
    return throwError(err);
  }
}
