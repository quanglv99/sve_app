import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { BioSupportPopupComponent } from "src/app/popups/bio-support-popup/bio-support-popup.component";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-tasks",
  standalone: true,
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
  ],
})
export class TasksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  public displayedColumns: string[] = [
    "tranId",
    "type",
    "taskName",
    "createdAt",
    "taskDescription",
    "action",
  ];
  dataSource: any;
  data: any;
  isOpen = true;
  showFilter = false;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  onClick(element: any): void {
    if(element.task_sub_group === "enroll")
    {
      const dialogRef = this.dialog.open(BioSupportPopupComponent, {
        data: element,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.refreshTableData();
        }
      });
    }
    
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  transferToDate(timestamp: any): Date {
    return new Date(timestamp);
  }

  initDataTable() {
    if (!this.dataSource) {
      const token = localStorage.getItem("currentToken");
      if (token) {
        this.authService.taskList(token, "", "").subscribe((res) => {
          if (res.status != 0) {
            this.dataSource =  new MatTableDataSource<any>(res.tasks);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
              localStorage.removeItem("currentToken");
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
            localStorage.removeItem("currentToken");
            this.router.navigate(["/login"]);
          });
        }
      });
    }
  }

  refreshSearch() {
    this.onSearch();
  }

  onSearch() {}
}
