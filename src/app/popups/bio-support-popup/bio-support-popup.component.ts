import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { StepProgressComponent } from 'src/app/shared/step-progress/step-progress.component';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { UserDetailModel } from 'src/app/shared/models/user-detail.models';

@Component({
  selector: 'app-bio-support-popup',
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
  providers: [DatePipe],
  templateUrl: './bio-support-popup.component.html',
  styleUrls: ['./bio-support-popup.component.scss'],
})
export class BioSupportPopupComponent {

  bioForm!: FormGroup;
  currentStep!: number;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDetailModel,
    private dialogRef: MatDialogRef<BioSupportPopupComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private dialog: MatDialog,
    private toast: NgToastService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const formattedCreatedDate = this.datePipe.transform(this.data.createdDate, 'yyyy-MM-dd');
    this.bioForm = this.formBuilder.group({
      branchname: [this.data.branch.branchname],
      employeeCode: [this.data.employee.code],
      employeeFullname: [this.data.employee.fullname],
      createdDate: [formattedCreatedDate],
      employee: [this.data.employee],
      frontCard: [this.data.frontCard],
      backCard: [this.data.backCard],
      portrait: [this.data.portrait],
      reason: ['Upload giấy tờ không khớp thông tin'],
      other: [this.data.other],
      review: ['']
    });
  }
  onClose() {
    this.dialogRef.close();
  }

  onClick(image: any): void {
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: image
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
