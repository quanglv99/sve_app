import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule,Validators,FormGroup,FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from 'src/app/services/app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {  MatDialogModule } from '@angular/material/dialog';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
@Component({
  selector: "app-addconfig",
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
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    NgToastModule,
    HttpClientModule,
  ],
  templateUrl: "./addconfig.component.html",
  styleUrls: ["./addconfig.component.scss"],
})
export class AddconfigComponent {
  members: any;
  addConfigForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appService: AppService,
    private router: Router,
    private toast: NgToastService
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
        noteConfig: [''],
        status: ['']
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
      const apiUrl = this.appService.getConfigMemberList();
      this.http.post(apiUrl, formData).subscribe(
        (response) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Added successfully',
          duration: 5000,
        });
        this.router.navigate(['/default/setting/config'])
        },
        (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary:'Please try again',
            sticky: true,
          })
        }
      );
    }
  }
}
