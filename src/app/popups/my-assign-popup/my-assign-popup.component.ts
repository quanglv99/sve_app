import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MY_DATE_FORMATS } from 'src/app/shared/const/custom-date';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { AssignModel } from 'src/app/shared/models/assign-models';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';

@Component({
  selector: 'app-my-assign-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StepProgressComponent,
    ReactiveFormsModule,
    NgToastModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './my-assign-popup.component.html',
  styleUrls: ['./my-assign-popup.component.scss'],
})
export class MyAssignPopupComponent implements OnInit {
  currentStep!: number;
  dialogResult: number | null = null;
  assignForm!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  owners: any;
  employees: any;
  branch: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ];
  status = TRAN_STATUS;
  members = MEMBER_LIST;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignModel,
    private dialogRef: MatDialogRef<MyAssignPopupComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.initData();
    this.currentStep = this.data.status.id;
    this.initializeForm();
  }

  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.owners = result;
      this.employees = result;
    });
  }

  setData() {
    let startDate = this.assignForm.get('startDate')?.value as Date;
    let createdDate = this.data.createdDate as unknown as Date;
    if (startDate <= createdDate) {
      this.assignForm.get('status')?.setValue(this.status[2]);
    } else {
      this.assignForm.get('status')?.setValue(this.status[1]);
    }
  }

  initializeForm() {
    this.assignForm = this.formBuilder.group({
      branchname: [{ value: this.data.branch.branchname, disabled: this.isDisable }],
      member: [{ value: this.data.member.name, disabled: this.isDisable }],
      owner: [
        {
          value: `${this.data.owner.code}-${this.data.owner.fullname}`,
          disabled: this.isDisable,
        },
      ],
      startDate: [
        {
          value: this.data.startDate,
          disabled: this.isDisable,
        },
      ],
      endDate: [
        {
          value: this.data.endDate,
          disabled: this.isDisable,
        },
      ],
      employee: [
        {
          value: `${this.data.employee.code}-${this.data.employee.fullname}`,
          disabled: this.isDisable,
        },
      ],
      note: [{ value: this.data.note, disabled: this.isDisable }],
      approver: [{ value: this.data.approver, disabled: this.isDisable }],
      createdDate: [this.data.createdDate],
      createdUser: [this.data.createdUser],
      file: [{ value: this.data.file, disabled: this.isDisable }],
      status: [''],
    });
  }

  onClose() {
    this.dialogResult = 0
      this.dialogRef.close(this.dialogResult);
  }
  onCancelAssign() {
    this.data.status = TRAN_STATUS[7]
    const url = `${this.appService.getAssignUrl()}/${this.data.id}`;
    this.http.put(url, this.data).subscribe((response) => {
      this.toast.warning({
        detail: 'WARN',
        summary: `Bạn đã hủy bản ghi ID: ${this.data.id}`,
        duration: 5000,
      });
      this.dialogResult = 1 
      this.dialogRef.close(this.dialogResult);
    });
  }

  onRemoveAssign()
  {
    this.data.status = TRAN_STATUS[6]
    const url = `${this.appService.getAssignUrl()}/${this.data.id}`;
    this.http.put(url, this.data).subscribe((response) => {
      this.toast.warning({
        detail: 'WARN',
        summary: `Bạn đã chấm dứt bản ghi ID: ${this.data.id}`,
        duration: 5000,
      });
      this.dialogResult = 1 
      this.dialogRef.close(this.dialogResult);
    });
  }
}
