import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "src/app/services/auth.service";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { MatCardModule } from "@angular/material/card";
import { BranchSelectPopupComponent } from "src/app/popups/branch-select-popup/branch-select-popup.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { LoadingService } from "src/app/services/loading.service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgToastModule,
    MatCardModule,
    MatDialogModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  data: any;
  loading = this.loadingService.getCurrentGlobalSpinStore();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [""],
      password: [""],
    });
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  async onSubmit() {
    this.spinner.show();
    const username = this.loginForm.get("username")!.value;
    const password = this.loginForm.get("password")!.value;
    this.authService.login(username, password).subscribe(
      async (response) => {
        if (response.status === 1) {
          localStorage.setItem("branchname", "Unknown");
          localStorage.setItem("currentUsername", username);
          this.router.navigate(["default/dashboard"]);
          this.spinner.hide();
          // const dialogRef = this.dialog.open(BranchSelectPopupComponent, {});
        } else if (response.status === 2) {
          const job_id = response.job_id;
          const queryJobStatus = async (jobId: string) => {
            try {
              const res = await this.authService.loginQuery(jobId).toPromise();
              if (res.status == 0) {
                this.spinner.hide();
                this.toast.error({
                  detail: "Notification",
                  summary: `${res.message}`,
                  duration: 5000,
                });
              } else if (res.status == 1) {
                setTimeout(()=>{
                  this.toast.success({
                    detail: "Notification",
                    summary: "This is your first log in",
                    duration: 5000,
                  });
                  this.onSubmit();
                },5000);
                
              } else {
                setTimeout(() => queryJobStatus(job_id), 5000);
              }
            } catch (error) {
              console.error("Error in jobQuery: ", error);
            }
          };
          queryJobStatus(job_id);
        } else {
          this.spinner.hide();
          this.toast.error({
            detail: "Log in failed",
            summary: `${response.message}`,
            duration: 5000,
          });
        }
      },
      (error) => {
        this.spinner.hide();
        console.error("Login error", error);
      }
    );
  }
}
