import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { StepProgressComponent } from 'src/app/shared/step-progress/step-progress.component';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bio-support-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StepProgressComponent,
    ReactiveFormsModule,
    NgToastModule,
  ],
  providers: [DatePipe],
  templateUrl: './bio-support-popup.component.html',
  styleUrls: ['./bio-support-popup.component.scss'],
})
export class BioSupportPopupComponent {

  bioForm!: FormGroup;
  currentStep!: number;
  isDisable: boolean = true;
  image!: string;
  readFrontId!: string;
  readBackId!: string;
  readPhoto!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BioSupportPopupComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toast: NgToastService,
    private authService: AuthService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.bioForm = this.formBuilder.group({
      group: [this.data.task_sub_group],
      name: [this.data.task_name],
      description: [this.data.task_description],
      json: [this.data.task_json],
      role: [this.data.task_role],
      timestamp: [new Date(this.data.start_timestamp)],
      note: [''],
    });
  }

  approveRequest()
  {
    const token = localStorage.getItem("currentToken")
    const task_key = this.data.task_key
    const approve_state = "approved"
    const note = this.bioForm.value.note
    if(token)
    {
      this.authService.approve(token,task_key,approve_state,note).subscribe(
        (res:any)=>
        {
          if(res.status != 0)
          {
            this.toast.success(
              {
                detail: "Thông báo",
                summary: "Bạn vừa phê duyệt thành công",
                duration: 5000,
              }
            )
            this.onClose(true)
          }
          else
          {
            this.toast.error(
              {
                detail: "Lỗi",
                summary: `Message: ${res.message}`,
                duration: 5000,
              }
            )
          }
          
        }
      )
    }
  }

  onClickFront(): void {
    if (!this.readFrontId) {
      const token = localStorage.getItem("currentToken");
      const user_id = "";
      const member = JSON.parse(this.data.task_json.approve_json)
      const member_id = member.sve_member_id;
      const username = "";
      const photo = ["id_card_front_scan"];
      const zip = false;
      if (token) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if(res.status === 1)
            {
              this.image = res.sve_member.id_card_front_scan;
              this.readFrontId = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });
              dialogRef.afterClosed().subscribe((result) => {});
            }else
            {
              alert(res.message)
            }
          });
      }
    } else {
      const dialogRef = this.dialog.open(ImagePopupComponent, {
        data: this.readFrontId,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  onClickBack(): void {
    if (!this.readBackId) {
      const token = localStorage.getItem("currentToken");
      const user_id = "";
      const member = JSON.parse(this.data.task_json.approve_json)
      const member_id = member.sve_member_id;
      const username = "";
      const photo = ["id_card_back_scan"];
      const zip = false;
      if (token) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if(res.status === 1)
            {
              this.image = res.sve_member.id_card_back_scan;
              this.readBackId = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });
              dialogRef.afterClosed().subscribe((result) => {});
            }else
            {
              alert(res.message)
            }
          });
      }
    } else {
      const dialogRef = this.dialog.open(ImagePopupComponent, {
        data: this.readBackId,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  onClickPhoto(): void {
    if (!this.readPhoto) {
      const token = localStorage.getItem("currentToken");
      const user_id = "";
      const member = JSON.parse(this.data.task_json.approve_json)
      const member_id = member.sve_member_id;
      const username = "";
      const photo = ["photo"];
      const zip = false;
      if (token) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if(res.status === 1)
            {
              this.image = res.sve_member.photo;
              this.readPhoto = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });
              dialogRef.afterClosed().subscribe((result) => {});
            }else
            {
              alert(res.message)
            }
          });
      }
    } else {
      const dialogRef = this.dialog.open(ImagePopupComponent, {
        data: this.readPhoto,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  cancelRequest()
  {
    const token = localStorage.getItem("currentToken")
    const task_key = this.data.task_key
    const approve_state = "disagreed"
    const note = this.bioForm.value.note
    if(token)
    {
      this.authService.approve(token,task_key,approve_state,note).subscribe(
        (res: any)=>
        {
          if(res.status != 0)
          {
            this.toast.info(
              {
                detail: "Thông báo",
                summary: "Bạn đã từ chối yêu cầu thành công",
                duration: 5000,
              }
            )
            this.onClose(true)
          }
          else
          {
            this.toast.error(
              {
                detail: "Lỗi",
                summary:  `Message: ${res.message}`,
                duration: 5000,
              }
            )
          }
          
        }
      )
    }
  }


  onClose(res: boolean) {
    this.dialogRef.close(res);
  }

  onClick(image: any): void {
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: image
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
