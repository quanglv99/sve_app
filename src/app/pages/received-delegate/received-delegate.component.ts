import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { DelegateModel } from 'src/app/shared/models/delegate-models';
import { ReceivedDelegatePopupComponent } from 'src/app/popups/received-delegate-popup/received-delegate-popup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BranchModel } from 'src/app/shared/models/branch.models';
import { Employee } from 'src/app/shared/models/employee.models';
import { MemberModel } from 'src/app/shared/models/member.models';
@Component({
  selector: 'app-received-delegate',
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
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,],
  templateUrl: './received-delegate.component.html',
  styleUrls: ['./received-delegate.component.scss']
})
export class ReceivedDelegateComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
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
  dataSource: any;
  isOpen =true
  data: any;
  hide= false;
  formSearch! : FormGroup
  statusFilter = TRAN_STATUS
  memberFilter = MEMBER_LIST
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
    const dialogRef = this.dialog.open(ReceivedDelegatePopupComponent, {
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
      const url = this.appConfig.getDelegateUrl();
      this.http.get(url).subscribe((result: any) => {
        this.data = result.sort(
          (a: DelegateModel, b: DelegateModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource = new MatTableDataSource<DelegateModel>(this.data);
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
    const url = this.appConfig.getDelegateUrl();
    const filterParams = this.formSearch.value;
    filterParams.branchInput = this.branchSelected;
    filterParams.memberInput = this.memberSelected;
    filterParams.ownerInput = this.ownerSelected;
    filterParams.receiverInput = this.receiverSelected;

    this.http.get(url).subscribe((result: any) => {
      this.data = result
        .filter((item: DelegateModel) => {
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
          (a: DelegateModel, b: DelegateModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
      this.dataSource.data = this.data;
    });
  }


  refreshTableData() {
    const url = this.appConfig.getDelegateUrl();
    this.http
      .get(url)
      .subscribe((result: any) => {
        this.data = result.sort(
          (a: DelegateModel, b: DelegateModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource.data = this.data;
      });
  }
}
