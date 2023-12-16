import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
// import { result } from 'lodash';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { UserDetailModel } from 'src/app/shared/models/user-detail.models';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  data: any;
  basicGroup!: FormGroup;
  biometricForm!: FormGroup;
  fontCard!: string;
  backCard!: string;
  portrait!: string;
  other!: string;
  fileSelected!: string;
  register!: UserDetailModel;
  passcode = Math.floor(100000 + Math.random() * 900000);
  registerData: any;
  bioStatus!:string
  showFormInput =false;
  isEdit = false
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private dialog: MatDialog,
    private toast: NgToastService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.register = {} as UserDetailModel;
    this.initializeData();
    this.comprareInitData();
    this.biometricForm = this.formBuilder.group({
      imgFront: ['', Validators.required],
      imgBack: ['', Validators.required],
      imgAvt: ['', Validators.required],
      file: [''],
    });
  }
  initializeData() {
    const url = this.appService.getEmployees();
    this.http
      .get(url)
      .pipe(map((result: any) => result.find((r: { id: number }) => r.id == 1)))
      .subscribe((result: any) => {
        this.data = result;
        this.bioStatus = 'Chưa đăng ký'
      });
  }

  comprareInitData() {
    const url = this.appService.getUserDetail();
    this.http
      .get(url)
      .pipe(
        map((result: any) =>
          result.find((r: { employee: { code: string; }; }) => r.employee.code == this.data.code)
        )
      )
      .subscribe((result: any) => {
        if (result) {
          this.registerData = result;
          this.bioStatus = 'Đã upload thông tin'
        }else
        {
          this.showFormInput = true;
        }
      });
  }

  onFontSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then((base64Data: string) => {
          this.fontCard = base64Data;
        })
        .catch((error) => {
          console.error("Error converting to base64:", error);
        });
    }
  }

  onBackSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then((base64Data: string) => {
          this.backCard = base64Data;
        })
        .catch((error) => {
          console.error("Error converting to base64:", error);
        });
    }
  }

  onPortraitSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then((base64Data: string) => {
          this.portrait = base64Data;
        })
        .catch((error) => {
          console.error("Error converting to base64:", error);
        });
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        resolve(e.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  onOtherSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then((base64Data: string) => {
          this.other = base64Data;
          console.log("portrait: ", this.portrait);
        })
        .catch((error) => {
          console.error("Error converting to base64:", error);
        });
    }
  }
  registerBiometric() {
    this.register.employee = this.data;
    this.register.frontCard = this.fontCard;
    this.register.backCard = this.backCard;
    this.register.portrait = this.portrait;
    this.register.other = this.other;
    this.register.branch = this.data.workAddress[0];
    this.register.createdDate = new Date();
    this.register.updatedDate = new Date();
    this.register.supporter ='';
    this.register.passcode = this.passcode;
    const url = this.appService.getUserDetail();
    this.http.post(url, this.register).subscribe((result) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {
          message: `Your passcode is: ${this.passcode}`,
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        this.showFormInput = false
       this.ngOnInit();
       this.toast.success({detail:"SUCCESS",summary:'Tải thông tin thành công',duration:5000});
      });
    });
  }


  toggleForms() {
    this.showFormInput = !this.showFormInput;
    this.isEdit = !this.isEdit
}

onClick(image: any): void {
  const dialogRef = this.dialog.open(ImagePopupComponent, {
    data: image
  });

  dialogRef.afterClosed().subscribe(result => {
    
  });
}
}
