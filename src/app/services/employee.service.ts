import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeData = new BehaviorSubject<any>(null);

  setMemberData(data: any): void{
    this.employeeData.next(data);
  }
  getMemberData(): Observable<any>{
    return this.employeeData.asObservable();
  }
}
