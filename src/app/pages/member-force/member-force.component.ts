import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { EditmemberDetailPopupComponent } from 'src/app/popups/editmember-detail-popup/editmember-detail-popup.component';
import { AppService } from 'src/app/services/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MemberModel } from 'src/app/shared/models/member.models';
import { NgToastService } from 'ng-angular-popup';
import { MemberForceModel } from 'src/app/shared/models/member-force';
import { EditMemberForceDetailPopupComponent } from 'src/app/popups/edit-member-force-detail-popup/edit-member-force-detail-popup.component';

@Component({
  selector: 'app-member-force',
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
  templateUrl: './member-force.component.html',
  styleUrls: ['./member-force.component.scss']
})
export class MemberForceComponent implements OnInit {
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
    'employee',
    // 'status',
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
    ) {}
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
        console.log('hihi',this.data);
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
    const dialogRef = this.dialog.open(EditMemberForceDetailPopupComponent, {
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
    if (element.employee === null) {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Không thể xóa bản ghi, do chưa được chỉ định',
        duration: 3000,
      });
      return;
    }
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure to delete this record?',
        showYesNo: true,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Gọi hàm cập nhật với giá trị employee là null
        this.updateMember({ ...element, employee: null });
        
        // Cập nhật dataSource sau khi xóa
        this.dataSource.data = this.dataSource.data.map((item: MemberModel) =>
          item.id === element.id ? { ...item, employee: null } : item
        );
  
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Deleted successfully',
          duration: 5000,
        });
      }
    });
  }
  
  
  updateMember(updatedElement: any): void {
    const url = `${this.appConfig.getMemberList()}/${updatedElement.id}`;
    this.http.put(url, updatedElement).subscribe(
      (response) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Update successful',
          duration: 3000,
        });
      },
      (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Please try again',
          sticky: true,
        });
      }
    );
  }
}
