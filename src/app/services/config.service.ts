import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configData = new BehaviorSubject<any>(null);

  setConfigData(data: any): void{
    this.configData.next(data);
  }
  getConfigData(): Observable<any>{
    return this.configData.asObservable();
  }

}
