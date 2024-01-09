import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { NgToastModule, NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-addmember",
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule,
    NgToastModule,
  ],
  templateUrl: "./addmember.component.html",
  styleUrls: ["./addmember.component.scss"],
})
export class AddmemberComponent {
  jobcodes: any;
  addMemberForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initData();
  }

  initializeForm() {
    this.addMemberForm = this.formBuilder.group({
      name: ["", Validators.required],
      jobcodes: [[], Validators.required], // Initialize as an empty array
      noteConfig: [""],
      status: [""],
    });
  }

  initData() {
    const e_url = this.appService.getJobcodeList();
    this.http.get(e_url).subscribe((result: any) => {
      this.jobcodes = result;
    });
  }
  onSummit() {
    if (this.addMemberForm.valid) {
      const formData = this.addMemberForm.value;
      const apiUrl = this.appService.getMemberList();

      this.http.post(apiUrl, formData).subscribe(
        (response) => {
          this.toast.success({
            detail: "SUCCESS",
            summary: "Thêm mới thành công",
            duration: 5000,
          });
          this.router.navigate(["/default/setting/member"]);
        },
        (error) => {
          this.toast.error({
            detail: "ERROR",
            summary: "Vui lòng thử lại",
            sticky: true,
          });
        }
      );
    }
  }
}
