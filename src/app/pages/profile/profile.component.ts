import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
// import { result } from 'lodash';
import { ImagePopupComponent } from "src/app/shared/image-popup/image-popup.component";
import { NgToastModule, NgToastService } from "ng-angular-popup";
import { UserDetailModel } from "src/app/shared/models/user-detail.models";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LoadingService } from "src/app/services/loading.service";
import { InterceptorService } from "src/app/services/interceptor.service";
import { zip } from "lodash";
@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgToastModule,
    MatProgressBarModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  data: any;
  basicGroup!: FormGroup;
  biometricForm!: FormGroup;
  frontCard!: string;
  backCard!: string;
  photo!: string;
  other!: string;
  fileSelected!: string;
  register!: UserDetailModel;
  passcode = Math.floor(100000 + Math.random() * 900000);
  registerData: any;
  bioStatus!: string;
  showFormInput = false;
  isEdit = false;
  userLoggerSession: any;
  enroll_status!: number;
  enroll_message!: string;
  loading = false;
  image!: string;
  readFrontId!: string;
  readBackId!: string;
  readPhoto!: string;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private dialog: MatDialog,
    private toast: NgToastService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.register = {} as UserDetailModel;
    this.initializeData();
    this.biometricForm = this.formBuilder.group({
      imgFront: ["", Validators.required],
      imgBack: ["", Validators.required],
      imgAvt: ["", Validators.required],
      file: [""],
    });
  }
  initializeData() {
    const token = localStorage.getItem("currentToken");
    const username = localStorage.getItem("currentUsername");
    const user_id = "";
    const member_id = "";
    const full_info = false;
    if (token && username) {
      this.authService
        .profile(token, user_id, member_id, username, full_info)
        .subscribe(
          (response) => {
            if (response.status == 1) {
              this.data = response.sve_member;
            } else {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: { message: "Session Timeout", showYesNo: false },
              });
              dialogRef.afterClosed().subscribe((response) => {
                this.router.navigate(["/login"]);
              });
            }
          },
          (error) => {
            console.error("Error fetching data:", error);
          }
        );
    }
    this.enrollCheck();
  }

  enrollCheck() {
    const token = localStorage.getItem("currentToken");
    this.authService.enrollCheck(token).subscribe((result: any) => {
      if (result.status != 0) {
        this.enroll_status = result.status;
        this.enroll_message = result.message;
        if (result.status == 1) {
          this.showFormInput = true;
        }
      }
    });
  }

  onFontSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then((base64Data: string) => {
          this.frontCard = base64Data;
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
          this.photo = base64Data;
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
        const base64String = e.target.result.split(",")[1]; // Get the part after the comma
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  enrollSudmit() {
    const token = localStorage.getItem("currentToken");
    const foundation_id = "3695AC1F-BC9D-4D7F-8841-540262202C16";
    if (token) {
      this.authService
        .enroll(token, foundation_id, this.frontCard, this.backCard, this.photo)
        .subscribe((result) => {
          console.log("Response: ", result);
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: {
              message: `Your passcode is: ${this.passcode}`,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.showFormInput = false;
            this.ngOnInit();
            this.toast.success({
              detail: "SUCCESS",
              summary: "Tải thông tin thành công",
              duration: 5000,
            });
          });
        });
    }
  }

  toggleForms() {
    this.showFormInput = !this.showFormInput;
    this.isEdit = !this.isEdit;
  }

  onClickFront(): void {
    if (!this.readFrontId) {
      const token = localStorage.getItem("currentToken");
      const user_id = "";
      const member_id = "";
      const username = "quang.lo@artjsc.vn";
      const photo = ["id_card_front_scan"];
      const zip = false;

      if (token) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if(res.status != 0)
            {
              this.image = res.sve_member.id_card_front_scan;
              this.readFrontId = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });
  
              dialogRef.afterClosed().subscribe((result) => {});
            }else
            {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: { message: "Session Timeout", showYesNo: false },
              });
              dialogRef.afterClosed().subscribe((response) => {
                this.router.navigate(["/login"]);
              });
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
      const member_id = "";
      const username = "quang.lo@artjsc.vn";
      const photo = ["id_card_back_scan"];
      const zip = false;
      if (token) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if(res.status != 0)
            {
              this.image = res.sve_member.id_card_back_scan;
              this.readBackId = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });
  
              dialogRef.afterClosed().subscribe((result) => {});
            }else
            {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: { message: "Session Timeout", showYesNo: false },
              });
              dialogRef.afterClosed().subscribe((response) => {
                this.router.navigate(["/login"]);
              });
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
      const member_id = "";
      const username = "quang.lo@artjsc.vn";
      const photo = ["photo"];
      const zip = false;
      if (token) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if(res.status != 0)
            {
              this.image = res.sve_member.photo;
              this.readPhoto = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });
  
              dialogRef.afterClosed().subscribe((result) => {});
            }else
            {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: { message: "Session Timeout", showYesNo: false },
              });
              dialogRef.afterClosed().subscribe((response) => {
                this.router.navigate(["/login"]);
              });
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
}
