import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  private messageSubject = new BehaviorSubject<string>("Loading...");
  messageState$ = this.messageSubject.asObservable();

  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  updateMessage(message: string) {
    this.messageSubject.next(message);
  }
}
