
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { EditmemberDetailPopupComponent } from 'src/app/popups/editmember-detail-popup/editmember-detail-popup.component';
import { AppService } from 'src/app/services/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MemberModel } from 'src/app/shared/models/member.models';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-membercontrol',
  standalone: true,
  imports: [
    CommonModule,
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
    EditmemberDetailPopupComponent,


  ],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MembercontrolComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  reponseData: any;

  displayedColumns: string[] = [
    'id',
    'nameMember',
    'status',
    'action',
  ];
  dataSource: any;
  data: any;
  statusLabelPosition: 'before' | 'after' = 'after';
  constructor(
    private appConfig: AppService,
    private http: HttpClient,
    private dialog: MatDialog,
    private toast: NgToastService
  ) { }
  ngOnInit(): void {
    this.initDataTable();
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getMemberList();
      this.http.get(url).subscribe((result: any) => {
        this.data = result;
        this.dataSource = new MatTableDataSource<MemberModel>(this.data);

        console.log('hihi', this.data);
      });
    }
  }
  onChange($event: any) {
    if ($event.value != 0) {
      let filerData = this.data.filter(
        (item: any) => item.status.id == $event.value
      );
      this.dataSource = new MatTableDataSource<MemberModel>(filerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource<MemberModel>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  refreshTableData() {
    const url = this.appConfig.getMemberList();
    this.http.get(url).subscribe((result: any) => {
      this.data = result;
      this.dataSource.data = this.data;
    });
  }
  onClick(element: any): void {
    const dialogRef = this.dialog.open(EditmemberDetailPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTableData()
    });
  }
  deleteRecord(id: number): Observable<any> {
    const url = `${this.appConfig.getMemberList()}/${id}`;
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
            (item: MemberModel) => item.id !== element.id
          );
        });
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Deleted successfully',
          duration: 5000,
        })
      }
    });
  }


}
