import { Component, OnInit, ViewChild } from "@angular/core";
import { AsyncPipe, CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { MEMBER_LIST } from "src/app/shared/const/member-value";
import { TRAN_STATUS } from "src/app/shared/const/tran-status";
import { AssignModel } from "src/app/shared/models/assign-models";
import { ApproveAssignPopupComponent } from "src/app/popups/approve-assign-popup/approve-assign-popup.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { BranchModel } from "src/app/shared/models/branch.models";
import { map, startWith } from "rxjs";
import { MemberModel } from "src/app/shared/models/member.models";
import { Employee } from "src/app/shared/models/employee.models";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
@Component({
  selector: "app-approve-assign",
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    AsyncPipe,
    MatTooltipModule,
    MatSlideToggleModule,
    MatListModule,
  ],
  templateUrl: "./approve-assign.component.html",
  styleUrls: ["./approve-assign.component.scss"],
})
export class ApproveAssignComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    "id",
    "branchname",
    "createdDate",
    "owner",
    "employee",
    "member",
    "status",
    "action",
  ];
  dataSource: any;
  isOpen = true;
  data: any;
  hide = false;
  formSearch!: FormGroup;
  memberFilter = MEMBER_LIST;
  statusFilter = TRAN_STATUS;
  branches: any;
  filteredOptions!: any;
  myControl = new FormControl<string | BranchModel>("");
  branchSelected: any;
  memberSelected: any;
  memberControl = new FormControl<string | MemberModel>("");
  memberOptions: any;
  ownerFilter: any;
  receiverFilter: any;
  ownerSelected: any;
  receiverSelected: any;
  ownerControl = new FormControl<string | Employee>("");
  receiverControl = new FormControl<string | Employee>("");
  ownerOptions: any;
  receiverOptions: any;
  showFilter = false
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(ApproveAssignPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTableData();
      }
    });
  }

  showFilterFn()
  {
    this.showFilter = !this.showFilter
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
        startWith(""),
        map((value) => {
          const name = typeof value === "string" ? value : value?.fullname;
          return name
            ? this._filterOwner(name as string)
            : this.ownerFilter.slice();
        })
      );
      this.receiverOptions = this.receiverControl.valueChanges.pipe(
        startWith(""),
        map((value) => {
          const name = typeof value === "string" ? value : value?.fullname;
          return name
            ? this._filterReceiver(name as string)
            : this.receiverFilter.slice();
        })
      );
    });

    this.http.get(this.appConfig.getBranches()).subscribe((result: any) => {
      this.branches = result;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map((value) => {
          const name = typeof value === "string" ? value : value?.branchname;
          return name ? this._filter(name as string) : this.branches.slice();
        })
      );
    });

    this.memberOptions = this.memberControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.name;
        return name
          ? this._filterMember(name as string)
          : this.memberFilter.slice();
      })
    );
  }

  //branch search
  onSelected(event: any) {
    this.branchSelected = event;
  }
  displayFn(branch: BranchModel): string {
    return branch ? branch.branchname : "";
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
    return owner ? `${owner.code}-${owner.fullname}` : "";
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
    return receiver ? `${receiver.code}-${receiver.fullname}` : "";
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
    return member ? member.name : "";
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
    this.branchSelected = undefined;
    this.memberSelected = undefined;
    this.ownerSelected = undefined;
    this.receiverSelected = undefined;
    this.refreshTableData();
  }

  initSearch() {
    this.formSearch = this.formBuilder.group({
      branchInput: [""],
      startDateInput: [""],
      endDateInput: [""],
      ownerInput: [""],
      receiverInput: [""],
      memberInput: [""],
      statusInput: [""],
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
            (filterParams.statusInput === "" ||
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

  refreshTableData() {
    const url = this.appConfig.getAssignUrl();
    this.http.get(url).subscribe((filterResult: any) => {
      this.data = filterResult.sort(
        (a: AssignModel, b: AssignModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }
}
