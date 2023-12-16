import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { BioSupportPopupComponent } from '../../popups/bio-support-popup/bio-support-popup.component';
import { UserDetailModel } from 'src/app/shared/models/user-detail.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-biometric-support',
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
  ],
  templateUrl: './biometric-support.component.html',
  styleUrls: ['./biometric-support.component.scss'],
})
export class BiometricSupportComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    'id',
    'employeeCode',
    'employeeFullname',
    'branchname',
    'createdDate',
    'reason',
    'action',
  ];
  dataSource: any;

  data: any;
  formSearch!: FormGroup;
  isOpen = true;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(BioSupportPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTableData();
    });
  }

  ngOnInit(): void {
    this.initSearch();
    this.initDataTable();
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getUserDetail();
      this.http.get(url).subscribe((filterResult: any) => {
        this.data = filterResult.sort(
          (a: UserDetailModel, b: UserDetailModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource = new MatTableDataSource<UserDetailModel>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  refreshTableData() {
    const url = this.appConfig.getUserDetail();
    this.http.get(url).subscribe((result: any) => {
      this.data = result.sort(
        (a: UserDetailModel, b: UserDetailModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }

  refreshSearch() {
    this.initSearch();
    this.onSearch();
  }

  initSearch() {
    this.formSearch = this.formBuilder.group({
      branchnameInput: [''],
      startDateInput: [''],
      endDateInput: [''],
      employeeCode: [''],
      employeeInput: [''],
    });
  }
  onSearch() {
    const url = this.appConfig.getUserDetail();
    const filterParams = this.formSearch.value;

    this.http.get(url).subscribe((result: any) => {
      this.data = result
        .filter((item: UserDetailModel) => {
          return (
            (filterParams.branchnameInput === '' ||
              item.branch.branchname
                .toLowerCase()
                .includes(filterParams.branchnameInput.toLowerCase())) &&
            (!filterParams.startDateInput ||
              new Date(item.createdDate) >= filterParams.startDateInput) &&
            (!filterParams.endDateInput ||
              new Date(item.createdDate) <= filterParams.endDateInput) &&
            (filterParams.employeeCode === '' ||
              item.employee.code
                .toLowerCase()
                .includes(filterParams.employeeCode.toLowerCase())) &&
            (filterParams.employeeInput === '' ||
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
