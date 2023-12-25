import { Employee } from './../../shared/models/employee.models';
import {  Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
} from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MemberForceModel } from 'src/app/shared/models/member-force';
@Component({
  selector: 'app-edit-member-force-detail-popup',
  standalone: true,
  imports: [CommonModule,
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
    MatCheckboxModule
  
  ],
  templateUrl: './edit-member-force-detail-popup.component.html',
  styleUrls: ['./edit-member-force-detail-popup.component.scss']
})
export class EditMemberForceDetailPopupComponent {
  employee !: Employee[];
  editMemberForcePopup!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MemberForceModel,
    private dialogRef: MatDialogRef<EditMemberForceDetailPopupComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initData()
    this.initializeForm();

  }

  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.employee = result;
    });
  }
  initializeForm() {
    this.editMemberForcePopup = this.formBuilder.group({
      nameMemberForce: [this.data.nameMemberForce],
      employee: [
        Array.isArray(this.data.employee) ? this.data.employee.map((employee: { id: number }) => employee.id) : [],
        { value: this.data.employee },
      ],
      status: [this.data.status],
      noteMemberForce: [this.data.noteMemberForce],
    });
  
    this.editMemberForcePopup.valueChanges.subscribe(() => {
      this.isFormDirty = this.editMemberForcePopup.dirty;
    });
  }
  

  updateMembers(): void {
    if (this.editMemberForcePopup.valid) {
      const updateMemberForce = this.editMemberForcePopup.value;
      const employeeIds = updateMemberForce.employee;

      // Map lại thành mảng các jobcodes dựa trên id
      updateMemberForce.employee = employeeIds.map((id: number) =>
        this.employee.find((employee: any) => employee.id === id)
      );

      // Thực hiện cập nhật thông tin thành viên
      const url = `${this.appService.getMemberForceList()}/${this.data.id}`;
      this.http.put(url, updateMemberForce).subscribe(
        (response) => {
          this.toast.success({
            detail:'SUCCESS',
            summary:'Update successful',
            duration: 5000,
          });
          this.dialogRef.close(); // Đóng dialog sau khi cập nhật thành công
          this.router.navigate(['/default/setting/member-force']);
        },
        (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Please try again',
            sticky: true,
          })
        }
     
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
