import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthState } from 'src/app/shared/store/auth/auth.state';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
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
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('inputUsername', { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide: boolean = true;
  data: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) {}
  ngOnDestroy(): void {
    this.loginForm.reset();
  }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  onSubmit() {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.status === 1) {
          this.router.navigate(['default/dashboard']);
          this.toast.success({
            detail: 'Login success',
            summary: 'Welcome to Vault Access Control System',
            duration: 5000,
          });
        } else {
          this.toast.error({
            detail: 'Login Failed',
            summary: 'Username or Password is not correct',
            sticky: true,
          });
        }
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
