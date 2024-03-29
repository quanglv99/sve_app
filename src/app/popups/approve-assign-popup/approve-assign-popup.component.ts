import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { StepProgressComponent } from "src/app/shared/step-progress/step-progress.component";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/services/app.service";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { TRAN_STATUS } from "src/app/shared/const/tran-status";
import { AssignModel } from "src/app/shared/models/assign-models";

@Component({
  selector: "app-approve-assign-popup",
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
  templateUrl: "./approve-assign-popup.component.html",
  styleUrls: ["./approve-assign-popup.component.scss"],
})
export class ApproveAssignPopupComponent {
  updateWorkForm!: FormGroup;
  currentStep!: number;
  status = TRAN_STATUS;
  isDisable: boolean = true;
  dialogResult: number | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignModel,
    private dialogRef: MatDialogRef<ApproveAssignPopupComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appService: AppService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id;

    this.initializeForm();
  }

  initializeForm() {
    this.updateWorkForm = this.formBuilder.group({
      branchname: [
        { value: this.data.branch.branchname, disabled: this.isDisable },
      ],
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
      status: [""],
    });
  }
  onClose() {
    this.dialogResult = 0;
    this.dialogRef.close(this.dialogResult);
  }

  onAccept(): void {
    this.data.status = TRAN_STATUS[2];
    const url = `${this.appService.getAssignUrl()}/${this.data.id}`;
    this.http.put(url, this.data).subscribe((result) => {
      this.toast.info({
        detail: "INFO",
        summary: `Bạn đã phê duyệt bản ghi ID: ${this.data.id}`,
        duration: 5000,
      });
      this.dialogResult = 0;
      this.dialogRef.close(this.dialogResult);
    });
  }
}
