import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule, MatOption, MatOptionSelectionChange } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Observable, startWith, map } from "rxjs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SearchInputComponent } from "../../shared/search-input/search-input.component";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/services/app.service";
import { Employee } from "src/app/shared/models/employee.models";

@Component({
    selector: "app-add-role-group",
    standalone: true,
    templateUrl: "./add-role-group.component.html",
    styleUrls: ["./add-role-group.component.scss"],
    imports: [
        CommonModule,
        FormsModule,
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
        MatCheckboxModule,
        MatTooltipModule,
        SearchInputComponent
    ]
})
export class AddRoleGroupComponent implements OnInit {
  users = new FormControl<string[]>([]);
  searchCtrl = new FormControl('');
  userDataList: any
  filterDataUsers: any
  filterUsers!: Observable<string[]>;
constructor(private http:HttpClient, private appConfig: AppService, private formBuilder: FormBuilder)
{}
  ngOnInit(): void {
    this.http.get(this.appConfig.getEmployees()).subscribe((result) => {
      this.filterDataUsers = result;
      this.userDataList = this.searchCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterUser(value || ''))
      );
    });
  }

  private _filterUser(fullname: string): Employee[] {
    const filterValue = fullname.toLowerCase();

    return this.filterDataUsers.filter((user: { fullname: any }) =>
    user.fullname.toLowerCase().includes(filterValue)
    );
  }

  selected(e: MatSelect): 'some' | 'all' | undefined {
    if (e.options == null || e.options.length === 0) {
      return undefined;
    } else if (e._selectionModel.selected.length === e.options.length) {
      return 'all';
    } else if (
      e._selectionModel.selected.length > 0 &&
      e._selectionModel.selected.length < e.options.length
    ) {
      return 'some';
    } else {
      return undefined;
    }
  }

  toggleSelection(e: MatSelect) {
    let values: string[] = this.users.value || ([] as string[]);
    e.options.forEach((item: MatOption) => {
      if (this.selected(e) !== 'all' && !values.includes(item.value)) {
        values.push(item.value);
      } else if (this.selected(e) === 'all' && values?.includes(item.value)) {
        values = values.filter((value) => value !== item.value);
      }
    });
    this.users?.setValue(values);
  }

  onSelectionChange(a: MatOptionSelectionChange) {
    let values: string[] = this.users?.value || ([] as string[]);
    if (a.isUserInput) {
      if (a.source.selected && !values.includes(a.source.value)) {
        values.push(a.source.value);
      } else if (!a.source.selected && values.includes(a.source.value)) {
        values = values.filter((value) => value !== a.source.value);
      }
      this.users?.setValue(values);
    }
  }

  roles: any = [
    {name: 'Tạo giao dịch', label: "R001", completed: false},
    {name: 'Phê duyệt',label: "R002", completed: false},
    {name: 'Xuất báo cáo',label: "R003", completed: false},
    {name: 'Truy vấn',label: "R004", completed: false},
    {name: 'Chỉnh tham số',label: "R005", completed: false},
    {name: 'Hỗ trợ phê duyệt',label: "R006", completed: false},
    {name: 'Chỉnh sửa cấu hình',label: "R007", completed: false},
    {name: 'Chỉnh thành viên BQL',label: "R008", completed: false},
    {name: 'Phân quyền',label: "R009", completed: false},
  ]

}
