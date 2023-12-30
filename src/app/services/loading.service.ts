import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  setCurrentGlobalSpinStore(isSpinning: boolean): void {
    this.isLoading.next(isSpinning);
  }
  getCurrentGlobalSpinStore(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

}
