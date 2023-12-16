
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { VaultConfigModel } from 'src/app/shared/models/vault-config.models';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { ConfigService } from 'src/app/services/config.service';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';


import {  MatDialogModule } from '@angular/material/dialog';
import { EditConfigDetailPopupComponent } from 'src/app/popups/edit-config-detail-popup/edit-config-detail-popup.component';

@Component({
  selector: 'app-config',
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
    MatDialogModule
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent  implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  reponseData: any;

  displayedColumns: string[] = [
    'id',
    'nameConfig',
    'members',
    'action',
  ];
  dataSource: any;
  data: any;


  constructor(private configService: ConfigService,
    private appConfig: AppService,
    private http: HttpClient,

    private dialog: MatDialog,
    ) {}

  onRowClick(element: any): void {
    this.configService.setConfigData(element);
  }


  ngOnInit(): void {
    this.initDataTable();
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getConfigMemberList();
      this.http.get(url).subscribe((result: any) => {
        this.data = result;
        this.dataSource = new MatTableDataSource<VaultConfigModel>(this.data);

    console.log('hih',this.data)
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
            (item: VaultConfigModel) => item.id !== element.id
          );
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


}
