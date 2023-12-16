import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule,Validators,FormGroup,FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from 'src/app/services/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {  MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-addconfig',
  standalone: true,
  imports: [CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule],
  templateUrl: './addconfig.component.html',
  styleUrls: ['./addconfig.component.scss']
})
export class AddconfigComponent {
  members: any;
  addConfigForm! : FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appService: AppService,
    private dialog: MatDialog,
    private router: Router,
    ){

  }
  ngOnInit(): void {
    this.initializeForm();
    this.initData();
     }

     initializeForm() {
      this.addConfigForm = this.formBuilder.group({
        nameConfig: ['', Validators.required],
        members: [[], Validators.required],  // Initialize as an empty array
        note: [''],
      });
    }

    initData() {
      const e_url = this.appService.getMemberList();
      this.http.get(e_url).subscribe((result: any) => {
      this.members = result;
      });
    }

  onSummit() {
    if (this.addConfigForm.valid) {
      const formData = this.addConfigForm.value;
      formData.status = 'active';
      const apiUrl = this.appService.getConfigMemberList();
      this.http.post(apiUrl, formData).subscribe(
        (response) => {
          const dialogRef = this.dialog.open(ConfirmDialogComponent,{
            width: '300px',
            data: {message: 'Thêm mới thành phần thành công, trở về trang chính?',showYesNo:true}
          })
          dialogRef.afterClosed().subscribe( (response) =>
          {
            if(response)
            this.router.navigate(['/default/setting/config']);
          })
        },
        (error) => {
          console.error('Error adding data:', error);
        }
      );
    }
  }
}
