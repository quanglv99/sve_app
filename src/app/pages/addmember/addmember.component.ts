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
import { Router, RouterModule } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-addmember',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule

  ],
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})
export class AddmemberComponent{
  jobcodes: any;
  addMemberForm! : FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
    ){

  }

  ngOnInit(): void {
 this.initializeForm();
 this.initData();
  }

  initializeForm() {
    this.addMemberForm = this.formBuilder.group({
      name: ['', Validators.required],
      jobcodes: [[], Validators.required],  // Initialize as an empty array
      note: [''],
      status: [''],
    });
  }

  initData() {
    const e_url = this.appService.getJobcodeList();
    this.http.get(e_url).subscribe((result: any) => {
      this.jobcodes = result;
    });
  }
  onSummit() {
    if (this.addMemberForm.valid) {
      const formData = this.addMemberForm.value;
      const apiUrl = this.appService.getMemberList();



      this.http.post(apiUrl, formData).subscribe(
        (response) => {
          const dialogRef = this.dialog.open(ConfirmDialogComponent,{
            width: '300px',
            data: {message: 'Thêm mới thành phần thành công, trở về trang chính?',showYesNo:true}
          })

          dialogRef.afterClosed().subscribe( (response) =>
          {
            if(response)
            this.router.navigate(['/default/setting/member']);
          })

        },
        (error) => {
          console.error('Error adding data:', error);
        }
      );
    }
  }
}
