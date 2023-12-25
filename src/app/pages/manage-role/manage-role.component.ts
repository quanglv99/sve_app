import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-manage-role',
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
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    'id',
    'groupname',
    'description',
    'action',
  ];
  dataSource: any;
  isOpen =true
  data: any;
  hide= false;
  formSearch! : FormGroup
  filteredOptions!: any;
  myControl = new FormControl<string>('');
  branchSelected: any;
 
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
  }

  ngOnInit(): void {
    this.formSearchInitialize();
    this.initSearch();
    this.initDataTable();
  }

  // init form search
  formSearchInitialize() {
    this.formSearch = this.formBuilder.group(
      {

      }
    )
  }

  clearSelection() {
    
  }

  //branch search
  onSelected(event: any) {
  }
  displayFn(owner: any): string {
    return  '';
  }


  initDataTable() {
  }
  //onclick refresh
  refreshSearch() {
  }

  initSearch() {
   
  }

  onSearch() {
    
  }


  refreshTableData() {
    
  }

}
