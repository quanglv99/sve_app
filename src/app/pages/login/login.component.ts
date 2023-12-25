import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormControl,
  Validators,
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
import { AuthState } from "src/app/shared/store/auth/auth.state";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { MatCardModule } from "@angular/material/card";
import { BranchSelectPopupComponent } from "src/app/popups/branch-select-popup/branch-select-popup.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
    MatProgressBarModule
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("inputUsername", { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide: boolean = true;
  data: any;
  loading = false
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.loginForm.reset();
  }
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
    this.loading = true;
    const username = this.loginForm.get("username")!.value;
    const password = this.loginForm.get("password")!.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.status === 1) {
          const dialogRef = this.dialog.open(BranchSelectPopupComponent, {});
        } else {
          this.toast.error({
            detail: "Login Failed",
            summary: "Username or Password is not correct",
            sticky: true,
          });
        }
      },
      (error) => {
        console.error("Login error", error);
      }
    ).add(() => {
      this.loading = false;
    });;
  }
}
