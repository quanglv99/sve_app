import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ConfigService } from 'src/app/services/config.service';
import { VaultConfigModel } from 'src/app/shared/models/vault-config.models';
import { JobcodeModel } from 'src/app/shared/models/jobcode.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobcodeService } from 'src/app/services/jobcode.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JobcodeDetailPopupComponent } from 'src/app/popups/jobcode-detail-popup/jobcode-detail-popup.component';
import { AppService } from 'src/app/services/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-jobcode',
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
    HttpClientModule,
    MatDialogModule,
  ],
  templateUrl: './jobcode.component.html',
  styleUrls: ['./jobcode.component.scss']
})
export class JobcodeComponent implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | undefined;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    'id',
    'jobcode',
    'descriptionJobcode',
    'action',
  ];
  dataSource : any;
  data: any;

  constructor(private configService: ConfigService, private http: HttpClient, private jobcodeService: JobcodeService,
    private dialog: MatDialog,
    private appConfig: AppService,

    ) {}

  onRowClick(element: any): void {
    this.configService.setConfigData(element);
  }


  ngOnInit(): void {
    this.initDataTable();
  }

  getJobcodeList(){
    this.jobcodeService.getJobcodeList().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: console.log,
    });
  }


  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getJobcodeList();
      this.http.get(url).subscribe((result: any) => {
        this.data = result;
        this.dataSource = new MatTableDataSource<JobcodeModel>(this.data);
      });
    }
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  refreshTableData() {
    const url = this.appConfig.getJobcodeList();
    this.http.get(url).subscribe((result: any) => {
      this.data = result;
      this.dataSource.data = this.data;
    });
  }
  onClick(element: any): void {
    const dialogRef = this.dialog.open(JobcodeDetailPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.refreshTableData()
    });
  }


  deleteRow(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure to detele this record?',
        showYesNo: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecord(element.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (item: JobcodeModel) => item.id !== element.id
          );
        });
      }
    });
  }

  deleteRecord(id: number): Observable<any> {
    const url = `${this.appConfig.getJobcodeList()}/${id}`;
    return this.http.delete(url);
  }

}
