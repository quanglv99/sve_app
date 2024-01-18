import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { VaultConfigModel } from "src/app/shared/models/vault-config.models";
import { AppService } from "src/app/services/app.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { Observable } from "rxjs/internal/Observable";
import { MatDialog } from "@angular/material/dialog";
import { NgToastService } from "ng-angular-popup";
import { MatDialogModule } from "@angular/material/dialog";
import { EditConfigDetailPopupComponent } from "src/app/popups/edit-config-detail-popup/edit-config-detail-popup.component";

@Component({
  selector: "app-config",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"],
})
export class ConfigComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  reponseData: any;

  displayedColumns: string[] = ["id", "nameConfig", "members", "action"];
  dataSource: any;
  data: any;
  constructor(
    private appConfig: AppService,
    private http: HttpClient,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initDataTable();
  }
  onFilterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getConfigMemberList();
      this.http.get(url).subscribe((result: any) => {
        this.data = result;
        this.dataSource = new MatTableDataSource<VaultConfigModel>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  onChange($event: any) {
    if ($event.value != 0) {
      let filerData = this.data.filter(
        (item: any) => item.status.id == $event.value
      );
      this.dataSource = new MatTableDataSource<VaultConfigModel>(filerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource<VaultConfigModel>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  refreshTableData() {
    const url = this.appConfig.getConfigMemberList();
    this.http.get(url).subscribe((result: any) => {
      this.data = result;
      this.dataSource.data = this.data;
    });
  }

  deleteRecord(id: number): Observable<any> {
    const url = `${this.appConfig.getConfigMemberList()}/${id}`;
    return this.http.delete(url);
  }
  deleteRow(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: {
        title: "Confirmation",
        message: "Are you sure to detele this record?",
        showYesNo: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecord(element.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (item: VaultConfigModel) => item.id !== element.id
          );
        });
        this.toast.success({
          detail: "SUCCESS",
          summary: "Deleted successfully",
          duration: 5000,
        });
      }
    });
  }
  onClick(element: any): void {
    const dialogRef = this.dialog.open(EditConfigDetailPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.refreshTableData()
    });
  }
 
  // exportToExcel() {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('Config Report');
  
  //   // Add headers to the worksheet
  //   worksheet.addRow(['Id', 'Tên cấu hình', 'Thành phần', 'Hành động']);
  
  //   // Add data to the worksheet
  //   this.dataSource.data.forEach((element: any) => {
  //     worksheet.addRow([element.id, element.nameConfig, element.members.map((member: any) => member.name).join(', '), '']);
  //   });
  
  //   // Create a blob containing the Excel file
  //   workbook.xlsx.writeBuffer().then((buffer) => {
  //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  //     // Save the blob as a file
  //     const fileName = 'config_report.xlsx';
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = fileName;
  //     link.click();
  //   });
  // }
}
