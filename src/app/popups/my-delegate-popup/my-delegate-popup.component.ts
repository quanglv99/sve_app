import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MY_DATE_FORMATS } from '../../shared/const/custom-date';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { DelegateModel } from 'src/app/shared/models/delegate-models';

@Component({
  selector: 'app-my-delegate-popup',
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
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    StepProgressComponent,
    MatDialogModule,
    NgToastModule,
  ],
  providers: [DatePipe],
  templateUrl: './my-delegate-popup.component.html',
  styleUrls: ['./my-delegate-popup.component.scss'],
})
export class MyDelegatePopupComponent implements OnInit {
  delegateDetailForm!: FormGroup;
  currentStep!: number;
  status = TRAN_STATUS;
  isDisable: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DelegateModel,
    private dialogRef: MatDialogRef<MyDelegatePopupComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient,
    private appService: AppService,
    private toast: NgToastService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id;
    this.initializeForm();
  }

  initializeForm() {
    this.delegateDetailForm = this.formBuilder.group({
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
          value: this.datePipe.transform(
            this.data.startDate,
            'yyyy-MM-ddTHH:mm:ss'
          ),
          disabled: this.isDisable,
        },
      ],
      endDate: [
        {
          value: this.datePipe.transform(
            this.data.endDate,
            'yyyy-MM-ddTHH:mm:ss'
          ),
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
    this.dialogRef.close();
  }

  onCancelDelegate() {
    this.data.status = TRAN_STATUS[7];
    const url = `${this.appService.getDelegateUrl()}/${this.data.id}`;
    this.http.put(url, this.data).subscribe((response) => {
      this.toast.warning({
        detail: 'WARN',
        summary: `Bạn đã hủy bản ghi ID: ${this.data.id}`,
        sticky: true,
      });
      this.dialogRef.close();
    });
  }
  onRemoveDelegate()
  {
    this.data.status = TRAN_STATUS[6];
    const url = `${this.appService.getDelegateUrl()}/${this.data.id}`;
    this.http.put(url, this.data).subscribe((response) => {
      this.toast.warning({
        detail: 'WARN',
        summary: `Bạn đã chấm dứt bản ghi ID: ${this.data.id}`,
        sticky: true,
      });
      this.dialogRef.close();
    });
  }
}
