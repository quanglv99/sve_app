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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { JobcodeModel } from 'src/app/shared/models/jobcode.models';
import { JobcodeVibModel } from 'src/app/shared/models/jobcode-vib.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-addjobcode',
  standalone: true,
  imports: [CommonModule,
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
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './addjobcode.component.html',
  styleUrls: ['./addjobcode.component.scss']
})
export class AddjobcodeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | undefined;
  inputForm!: FormGroup
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    'id',
    'nameJobcode',
    'descriptionJobcode',
    'action',
  ];
  dataSource: any;
  data: any;
  searchClicked = false;
  searchValue: string = '';
  constructor(private http: HttpClient,
    private dialog: MatDialog,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) { }
  ngOnInit(): void {
    this.inputForm = this.formBuilder.group(
      {
        jobcode: ['', Validators.required]
      }
    )
  }
  searchJobcode() {
    const search = this.inputForm.value
    const url = this.appService.getVibJobcodeList()
    this.http.get(url).subscribe((result: any) => {
      this.data = result.filter((item: any) => {
        return (search.jobcode === '' || item.jobcode == search.jobcode)
      })
      this.dataSource = new MatTableDataSource<JobcodeVibModel>(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  addJobcode(element: any): void {  
    const addUrl = this.appService.getJobcodeList();
    this.http.get<JobcodeModel[]>(addUrl).subscribe((existingData: JobcodeModel[]) => {
      const existingRecord = existingData.find((record) => record.id === element.id);
      if (existingRecord) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: {
            message: 'ID này đã được thêm mới trước đó! Bạn có muốn cập nhật lại thông tin không!',
            showYesNo: true,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === true) {
            this.updateJobcode(element);
          }
        });
      } else {
        const dataToAdd: JobcodeModel = {
          id: element.id,
          jobcode: element.jobcode,
          descriptionJobcode: element.descriptionJobcode,
          status: element.status,
        };
        this.http.post(addUrl, dataToAdd).subscribe(
          (response: any) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Thêm mới jobcode thành công',
              duration: 5000,
            });
          },
          (error) => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Vui lòng thử lại',
              sticky: true,
            })
          }
        );
      }
    });
  }
  updateJobcode(element: any): void {
    const updateUrl = this.appService.getJobcodeList();
    const dataToUpdate: JobcodeModel = {
      id: element.id,
      jobcode: element.jobcode,
      descriptionJobcode: element.descriptionJobcode,
      status: element.status,
    };
    this.http.put(`${updateUrl}/${element.id}`, dataToUpdate).subscribe(
      (response: any) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Cập nhật jobcode thành công',
          duration: 5000,
        });
      },
      (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Vui lòng thử lại',
          sticky: true,
        })
      }
    );
  }
  onClick(element: JobcodeVibModel): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Bạn có muốn thêm bản ghi này không?',
        showYesNo: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.addJobcode(element);
      }
    });
  }
}
