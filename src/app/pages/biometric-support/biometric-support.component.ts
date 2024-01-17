import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/services/app.service";
import { BioSupportPopupComponent } from "../../popups/bio-support-popup/bio-support-popup.component";
import { UserDetailModel } from "src/app/shared/models/user-detail.models";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AuthService } from "src/app/services/auth.service";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-biometric-support",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatSlideToggleModule,
  ],
  templateUrl: "./biometric-support.component.html",
  styleUrls: ["./biometric-support.component.scss"],
})
export class BiometricSupportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    "type",
    "taskName",
    "createdAt",
    "taskDescription",
    "action",
  ];
  dataSource: any;

  data: any;
  formSearch!: FormGroup;
  isOpen = true;
  showFilter = false;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(BioSupportPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result)
      {
        this.refreshTableData();
      }
    });
  }

  showFilterFn() {
    this.showFilter = !this.showFilter;
  }

  ngOnInit(): void {
    this.initSearch();
    this.initDataTable();
  }

  transferToDate(timestamp:any): Date
  {
    return new Date(timestamp) 
  }

  initDataTable() {
    if (!this.dataSource) {
      const token = localStorage.getItem("currentToken");
      if (token) {
        this.authService.taskList(token, "", "").subscribe((res) => {
          if (res.status != 0) {
            this.dataSource = res.tasks;
            console.log("datasource: ", this.dataSource.length)
          } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: "300px",
              data: {
                title: "Có lỗi xảy ra",
                message: `Message: ${res.message}`,
                showYesNo: false,
              },
            });
            dialogRef.afterClosed().subscribe((response) => {
              localStorage.removeItem('currentToken')
              this.router.navigate(["/login"]);
            });
          }
        });
      }
    }
  }
  
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  refreshTableData() {
    const token = localStorage.getItem("currentToken");
      if (token) {
        this.authService.taskList(token, "", "").subscribe((res) => {
          if (res.status != 0) {
            this.dataSource = res.tasks;
          } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: "300px",
              data: {
                title: "Có lỗi xảy ra",
                message: `Message: ${res.message}`,
                showYesNo: false,
              },
            });
            dialogRef.afterClosed().subscribe((response) => {
              localStorage.removeItem('currentToken')
              this.router.navigate(["/login"]);
            });
          }
        });
      }
  }

  refreshSearch() {
    this.initSearch();
    this.onSearch();
  }

  initSearch() {
    this.formSearch = this.formBuilder.group({
      branchnameInput: [""],
      startDateInput: [""],
      endDateInput: [""],
      employeeCode: [""],
      employeeInput: [""],
    });
  }
  onSearch() {
    const url = this.appConfig.getUserDetail();
    const filterParams = this.formSearch.value;

    this.http.get(url).subscribe((result: any) => {
      this.data = result
        .filter((item: UserDetailModel) => {
          return (
            (filterParams.branchnameInput === "" ||
              item.branch.branchname
                .toLowerCase()
                .includes(filterParams.branchnameInput.toLowerCase())) &&
            (!filterParams.startDateInput ||
              new Date(item.createdDate) >= filterParams.startDateInput) &&
            (!filterParams.endDateInput ||
              new Date(item.createdDate) <= filterParams.endDateInput) &&
            (filterParams.employeeCode === "" ||
              item.employee.code
                .toLowerCase()
                .includes(filterParams.employeeCode.toLowerCase())) &&
            (filterParams.employeeInput === "" ||
              item.employee.fullname
                .toLowerCase()
                .includes(filterParams.employeeInput.toLowerCase()))
          );
        })
        .sort(
          (a: UserDetailModel, b: UserDetailModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
      this.dataSource.data = this.data;
    });
  }
}
