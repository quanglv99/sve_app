import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { MatNativeDateModule } from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { JobcodeModel } from 'src/app/shared/models/jobcode.models';

@Component({
  selector: 'app-jobcode-detail-popup',
  standalone: true,
  imports: [CommonModule,
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


  ],
  templateUrl: './jobcode-detail-popup.component.html',
  styleUrls: ['./jobcode-detail-popup.component.scss']
})
export class JobcodeDetailPopupComponent implements OnInit {
  detailJobcode!: FormGroup;
  currentStep!: number;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: JobcodeModel,
    private dialogRef: MatDialogRef<JobcodeDetailPopupComponent>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.detailJobcode = this.formBuilder.group({
      jobcode: [{ value: this.data.jobcode, disabled: this.isDisable }],
      descriptionJobcode: [{ value: this.data.descriptionJobcode, disabled: this.isDisable }],
      status: [''],

    });
  }
  onClose() {
    this.dialogRef.close();
  }


}
