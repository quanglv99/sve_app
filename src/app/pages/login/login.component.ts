import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
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
    private spinner: NgxSpinnerService
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
  onSubmit() {
    this.spinner.show();
    const username = this.loginForm.get("username")!.value;
    const password = this.loginForm.get("password")!.value;
    this.authService
      .login(username, password)
      .subscribe(
        (response) => {
          if (response.status === 1) {
            const dialogRef = this.dialog.open(BranchSelectPopupComponent, {});
          } else {
            this.toast.error({
              detail: "Login Failed",
              summary: `${response.message}`,
              duration: 5000,
            });
          }
        },
        (error) => {
          console.error("Login error", error);
        }
      )
      .add(() => {
        this.spinner.hide();
      });
  }
}
