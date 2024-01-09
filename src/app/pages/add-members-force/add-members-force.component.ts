import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { MemberModel } from "src/app/shared/models/member.models";

@Component({
  selector: "app-add-members-force",
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    NgToastModule,
    HttpClientModule,
  ],
  templateUrl: "./add-members-force.component.html",
  styleUrls: ["./add-members-force.component.scss"],
})
export class AddMembersForceComponent {
  employee: any;
  members: any;

  addMemberForceForm!: FormGroup;
  selectedMember!: MemberModel;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initData();
  }

  initializeForm() {
    this.addMemberForceForm = this.formBuilder.group({
      member: [[], Validators.required],
      employee: [[], Validators.required],
    });
  }

  //thành phần được chọn
  onMemberSelectionChange(event: any) {
    this.selectedMember = event.value;
  }

  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.employee = result;
    });

    const m_url = this.appService.getMemberList();
    this.http.get(m_url).subscribe((result: any) => {
      this.members = result;
    });
  }

  onSubmit() {
    const formData = this.addMemberForceForm.value;
    // Thêm trường employee vào selectedMember
    this.selectedMember.employee = formData.employee;

    const apiUrl = this.appService.getMemberList();
    // Gửi yêu cầu cập nhật thông tin thành viên
    this.http
      .put(`${apiUrl}/${this.selectedMember.id}`, this.selectedMember)
      .subscribe(
        (response) => {
          this.toast.success({
            detail: "SUCCESS",
            summary: "Cập nhật thành công",
            duration: 5000,
          });
          this.router.navigate(["/default/setting/member-force"]);
        },
        (error) => {
          this.toast.error({
            detail: "ERROR",
            summary: "Vui lòng thử lại",
            sticky: true,
          });
        }
      );
  }
}
