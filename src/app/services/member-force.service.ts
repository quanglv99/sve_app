import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberForceService {

  private memberForceData = new BehaviorSubject<any>(null);

  setMemberForceData(data: any): void{
    this.memberForceData.next(data);
  }
  getMemberForceData(): Observable<any>{
    return this.memberForceData.asObservable();
  }

}
