import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { StepProgressComponent } from "../../shared/step-progress/step-progress.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { HttpClient } from "@angular/common/http";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { JobcodeModel } from "src/app/shared/models/jobcode.models";
import { MemberModel } from "src/app/shared/models/member.models";
@Component({
  selector: "app-editmember-detail-popup",
  standalone: true,
  imports: [
    CommonModule,
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
    MatCheckboxModule,
    NgToastModule,
  ],
  templateUrl: "./editmember-detail-popup.component.html",
  styleUrls: ["./editmember-detail-popup.component.scss"],
})
export class EditmemberDetailPopupComponent implements OnInit {
  jobcodes!: JobcodeModel[];
  editMemberPopup!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MemberModel,
    private dialogRef: MatDialogRef<EditmemberDetailPopupComponent>,
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

  initData() {
    const e_url = this.appService.getJobcodeList();
    this.http.get(e_url).subscribe((result: any) => {
      this.jobcodes = result;
    });
  }
  initializeForm() {
    this.editMemberPopup = this.formBuilder.group({
      name: [this.data.name],
      jobcodes: [
        this.data.jobcodes.map((jobcode: { id: number }) => jobcode.id),
        { value: this.data.jobcodes },
      ],
      status: [this.data.status],
      note: [this.data.note],
    });

    this.editMemberPopup.valueChanges.subscribe(() => {
      this.isFormDirty = this.editMemberPopup.dirty;
    });
  }

  updateMembers(): void {
    if (this.editMemberPopup.valid) {
      const updateMembers = this.editMemberPopup.value;
      const jobcodeIds = updateMembers.jobcodes;

      // Map lại thành mảng các jobcodes dựa trên id
      updateMembers.jobcodes = jobcodeIds.map((id: number) =>
        this.jobcodes.find((jobcode: any) => jobcode.id === id)
      );

      // Thực hiện cập nhật thông tin thành viên
      const url = `${this.appService.getMemberList()}/${this.data.id}`;
      this.http.put(url, updateMembers).subscribe(
        (response) => {
          this.toast.success({
            detail: "SUCCESS",
            summary: "Update successful",
            duration: 5000,
          });
          this.dialogRef.close(); // Đóng dialog sau khi cập nhật thành công
          this.router.navigate(["/default/setting/config"]);
        },
        (error) => {
          this.toast.error({
            detail: "ERROR",
            summary: "Please try again",
            sticky: true,
          });
        }
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
