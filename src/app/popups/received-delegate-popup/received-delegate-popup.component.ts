import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
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
import { MatNativeDateModule } from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { NgToastModule } from 'ng-angular-popup';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { DelegateModel } from 'src/app/shared/models/delegate-models';

@Component({
  selector: 'app-received-delegate-popup',
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
  templateUrl: './received-delegate-popup.component.html',
  styleUrls: ['./received-delegate-popup.component.scss'],
})
export class ReceivedDelegatePopupComponent implements OnInit {
  delegateForm!: FormGroup;
  currentStep!: number;
  status = TRAN_STATUS;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DelegateModel,
    private dialogRef: MatDialogRef<ReceivedDelegatePopupComponent>,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id;
    this.initializeForm();
  }

  initializeForm() {
    this.delegateForm = this.formBuilder.group({
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
      file: [this.data.file],
      status: [''],
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
