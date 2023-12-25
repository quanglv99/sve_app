import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobcodeService {
  constructor( private http: HttpClient) {}

  getJobcodeList() : Observable<any>{
    return this.http.get('http://localhost:3000/jobcode');
  }



}
