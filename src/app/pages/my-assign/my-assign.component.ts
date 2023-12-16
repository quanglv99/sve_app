import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Observable, map, startWith } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { AssignModel } from 'src/app/shared/models/assign-models';
import { MyAssignPopupComponent } from 'src/app/popups/my-assign-popup/my-assign-popup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BranchModel } from 'src/app/shared/models/branch.models';
import { MemberModel } from 'src/app/shared/models/member.models';
import { Employee } from 'src/app/shared/models/employee.models';

@Component({
  selector: 'app-my-assign',
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
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './my-assign.component.html',
  styleUrls: ['./my-assign.component.scss'],
})
export class MyAssignComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  reponseData: any;
  displayedColumns: string[] = [
    'id',
    'branchname',
    'createdDate',
    'owner',
    'employee',
    'member',
    'status',
    'action',
  ];
  isOpen = true;
  dataSource: any;
  hide: boolean = false;
  data: any;
  formSearch!: FormGroup;
  statusFilter = TRAN_STATUS;
  memberFilter = MEMBER_LIST;
  branches: any;
  filteredOptions!: any;
  myControl = new FormControl<string | BranchModel>('');
  branchSelected: any;
  memberSelected: any;
  memberControl = new FormControl<string | MemberModel>('');
  memberOptions: any;
  ownerFilter: any;
  receiverFilter: any;
  ownerSelected: any;
  receiverSelected: any;
  ownerControl = new FormControl<string | Employee>('');
  receiverControl = new FormControl<string | Employee>('');
  ownerOptions: any;
  receiverOptions: any;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(MyAssignPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTableData();
    });
  }

  ngOnInit(): void {
    this.formSearchInitialize();
    this.initSearch();
    this.initDataTable();
  }

  // init form search
  formSearchInitialize() {
    this.http.get(this.appConfig.getEmployees()).subscribe((result) => {
      this.ownerFilter = result;
      this.receiverFilter = result;
      this.ownerOptions = this.ownerControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.fullname;
          return name
            ? this._filterOwner(name as string)
            : this.ownerFilter.slice();
        })
      );
      this.receiverOptions = this.receiverControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.fullname;
          return name
            ? this._filterReceiver(name as string)
            : this.receiverFilter.slice();
        })
      );
    });

    this.http.get(this.appConfig.getBranches()).subscribe((result: any) => {
      this.branches = result;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.branchname;
          return name ? this._filter(name as string) : this.branches.slice();
        })
      );
    });

    this.memberOptions = this.memberControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filterMember(name as string)
          : this.memberFilter.slice();
      })
    );
  }

  clearSelection() {
    this.ownerOptions = this.ownerControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.fullname;
        return name
          ? this._filterOwner(name as string)
          : this.ownerFilter.slice();
      })
    );
    this.receiverOptions = this.receiverControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.fullname;
        return name
          ? this._filterReceiver(name as string)
          : this.receiverFilter.slice();
      })
    );
    this.memberOptions = this.memberControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filterMember(name as string)
          : this.memberFilter.slice();
      })
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.branchname;
        return name ? this._filter(name as string) : this.branches.slice();
      })
    );
  }

  //branch search
  onSelected(event: any) {
    this.branchSelected = event;
  }
  displayFn(branch: BranchModel): string {
    return branch ? branch.branchname : '';
  }

  private _filter(branchname: string): BranchModel[] {
    const filterValue = branchname.toLowerCase();

    return this.branches.filter((branch: { branchname: string }) =>
      branch.branchname.toLowerCase().includes(filterValue)
    );
  }

  //owner search
  onOwnerSelected(event: any) {
    this.ownerSelected = event;
  }

  displayFnOwner(owner: Employee): string {
    return owner ? `${owner.code}-${owner.fullname}` : '';
  }

  private _filterOwner(fullname: string): Employee[] {
    const filterValue = fullname.toLowerCase();

    return this.ownerFilter.filter((owner: { fullname: string }) =>
      owner.fullname.toLowerCase().includes(filterValue)
    );
  }

  //receiver search
  onReceiverSelected(event: any) {
    this.receiverSelected = event;
  }

  displayFnReceiver(receiver: Employee): string {
    return receiver ? `${receiver.code}-${receiver.fullname}` : '';
  }

  private _filterReceiver(fullname: string): Employee[] {
    const filterValue = fullname.toLowerCase();

    return this.receiverFilter.filter((receiver: { fullname: string }) =>
      receiver.fullname.toLowerCase().includes(filterValue)
    );
  }

  // member search
  onMemberSelected(event: any) {
    this.memberSelected = event;
  }

  displayFnMember(member: MemberModel): string {
    return member ? member.name : '';
  }

  private _filterMember(membername: string): MemberModel[] {
    const filterValue = membername.toLowerCase();

    return this.memberFilter.filter((member: { name: any }) =>
      member.name.toLowerCase().includes(filterValue)
    );
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getAssignUrl();
      this.http.get(url).subscribe((result: any) => {
        this.data = result.sort(
          (a: AssignModel, b: AssignModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource = new MatTableDataSource<AssignModel>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }
  //onclick refresh
  refreshSearch() {
    this.initSearch();
    this.myControl.reset();
    this.receiverControl.reset();
    this.ownerControl.reset();
    this.memberControl.reset();
    this.branchSelected = null;
    this.memberSelected = null;
    this.ownerSelected = null;
    this.receiverSelected = null;
    this.clearSelection()
    this.refreshTableData();
  }

  initSearch() {
    this.formSearch = this.formBuilder.group({
      branchInput: [''],
      startDateInput: [''],
      endDateInput: [''],
      ownerInput: [''],
      receiverInput: [''],
      memberInput: [''],
      statusInput: [''],
    });
  }

  onSearch() {
    const url = this.appConfig.getAssignUrl();
    const filterParams = this.formSearch.value;
    filterParams.branchInput = this.branchSelected;
    filterParams.memberInput = this.memberSelected;
    filterParams.ownerInput = this.ownerSelected;
    filterParams.receiverInput = this.receiverSelected;

    this.http.get(url).subscribe((result: any) => {
      this.data = result
        .filter((item: AssignModel) => {
          return (
            (!filterParams.branchInput ||
              item.branch.id === filterParams.branchInput.id) &&
            (!filterParams.startDateInput ||
              new Date(item.createdDate) >= filterParams.startDateInput) &&
            (!filterParams.endDateInput ||
              new Date(item.createdDate) <= filterParams.endDateInput) &&
            (!filterParams.ownerInput ||
              item.owner.code === filterParams.ownerInput.code) &&
            (!filterParams.receiverInput ||
              item.employee.code === filterParams.receiverInput.code) &&
            (!filterParams.memberInput ||
              item.member.id === filterParams.memberInput.id) &&
            (filterParams.statusInput === '' ||
              item.status.id === filterParams.statusInput)
          );
        })
        .sort(
          (a: AssignModel, b: AssignModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
      this.dataSource.data = this.data;
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
            (item: AssignModel) => item.id !== element.id
          );
        });
      }
    });
  }

  deleteRecord(id: number): Observable<any> {
    const url = `${this.appConfig.getAssignUrl()}/${id}`;
    return this.http.delete(url);
  }

  refreshTableData() {
    const url = this.appConfig.getAssignUrl();
    this.http.get(url).subscribe((result: any) => {
      this.data = result.sort(
        (a: AssignModel, b: AssignModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }

  ExportToExcel() {}
}
