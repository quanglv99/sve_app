import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private memberData = new BehaviorSubject<any>(null);

  setMemberData(data: any): void{
    this.memberData.next(data);
  }
  getMemberData(): Observable<any>{
    return this.memberData.asObservable();
  }

}
