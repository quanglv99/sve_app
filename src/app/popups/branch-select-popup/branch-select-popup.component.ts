import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router, RouterModule } from "@angular/router";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { StepProgressComponent } from "src/app/shared/step-progress/step-progress.component";
import { BranchModel } from "src/app/shared/models/branch.models";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-branch-select-popup",
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
  templateUrl: "./branch-select-popup.component.html",
  styleUrls: ["./branch-select-popup.component.scss"],
})
export class BranchSelectPopupComponent {
  branchList: BranchModel[] = [
    { id: 1, branchname: "Hai Ba Trung" },
    { id: 2, branchname: "Ngô Quyền" },
    { id: 3, branchname: "Quang Trung" },
  ];

  constructor(
    private router: Router,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}
  submitBranch(branch: any) {
    localStorage.setItem("branchname",branch.branchname)
    this.dialog.closeAll();
    this.router.navigate(["default/dashboard"]);
    this.toast.success({
      detail: "Login success",
      summary: "Welcome to Vault Access Control System",
      duration: 5000,
    });
  }
}
