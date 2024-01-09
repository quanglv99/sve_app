import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { AppService } from 'src/app/services/app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';

@Component({
  selector: 'app-register-delegate',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgToastModule,
    HttpClientModule,
  ],
  templateUrl: './register-delegate.component.html',
  styleUrls: ['./register-delegate.component.scss'],
})
export class RegisterDelegateComponent implements OnInit {
  registerForm!: FormGroup;
  employees: any;
  owners: any;

  status = TRAN_STATUS;
  base64Image!: string;
  branches: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ];

  members = MEMBER_LIST;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = this.formBuilder.group({
      branchname: ['', Validators.required],
      owner: [{ value: this.owners }, Validators.required],
      member: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      employee: [{ value: this.employees }, Validators.required],
      status: [''],
      createdDate: [new Date()],
      createdUser: ['QuangLV'],
      approver: [''],
      note: [''],
      file: [''],
    });
  }
  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.owners = result;
      this.employees = result;
    });
  }
  setData() {
    let startDate = this.registerForm.get('startDate')?.value as Date;
    let createdDate = new Date();
    if (startDate <= createdDate) {
      this.registerForm.get('status')?.setValue(this.status[2]);
    } else {
      this.registerForm.get('status')?.setValue(this.status[1]);
    }
    this.registerForm.get('file')?.setValue(this.base64Image);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.base64Image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSummit() {
    this.setData();
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      formValues.status = TRAN_STATUS[1];
      const apiUrl = this.appService.getDelegateUrl();
      this.http.post(apiUrl, formValues).subscribe(
        (response) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Thêm mới thành công',
            duration: 5000,
          });
          this.router.navigate(['/default/my-delegate']);
        },
        (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Vui lòng thử lại',
            sticky: true,
          });
        }
      );
    }
  }
}
