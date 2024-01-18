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
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { ImagePopupComponent } from "src/app/shared/image-popup/image-popup.component";
import { NgToastModule } from "ng-angular-popup";
import { UserDetailModel } from "src/app/shared/models/user-detail.models";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CallSupportPopupComponent } from "src/app/popups/call-support-popup/call-support-popup.component";
import { SpinnerService } from "src/app/services/spinner.service";
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
    MatProgressSpinnerModule,
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
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
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
    this.enroll_message = "";
    const token = localStorage.getItem("currentToken");
    this.authService.enrollCheck(token).subscribe((result: any) => {
      this.enroll_status = result.status;
      this.enroll_message = result.message;
      if (result.status == 0) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: "300px",
          data: {
            title: "Có lỗi xảy ra",
            message: `Message: ${result.message}`,
            showYesNo: false,
          },
        });
        dialogRef.afterClosed().subscribe((response) => {
          localStorage.removeItem("currentToken");
          this.router.navigate(["/login"]);
        });
      } else if (result.status == 1 || result.status == 3) {
        if (result.status == 3 && !result.enrolling_status) {
          this.showFormInput = false;
        } else {
          this.showFormInput = true;
        }
      } else {
        this.showFormInput = false;
      }
    });
  }
  callSupporter() {
    const dialogRef = this.dialog.open(CallSupportPopupComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const token = localStorage.getItem("currentToken");
        if (token) {
          this.authService
            .callSupporter(token, result)
            .subscribe((res: any) => {
              if(res.status === 1)
              {
                this.enrollCheck();
              }else
              {
                const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                  width: "300px",
                  data: {
                    title: "Có lỗi xảy ra",
                    message: `Message: ${result.message}`,
                    showYesNo: false,
                  },
                });
                dialogRef.afterClosed().subscribe((response) => {
                  localStorage.removeItem("currentToken");
                  this.router.navigate(["/login"]);
              });
              }
              
            });
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

  enroll_state!: number;

  messageList: string[] = [
    "Đang phân tích dữ liệu",
    "Vui lòng chờ trong giây lát",
    "Kiên trì nào! Gần xong rồi",
  ];
  messageLoading!: string;
  messageIndex = 0;
  async enrollSubmit() {
    const token = localStorage.getItem("currentToken");
    const foundation_id = this.data.foundations[0].foundation_id
    console.log("foundation_id: ", foundation_id)
    if (token) {
      this.authService
        .enroll(token, foundation_id, this.frontCard, this.backCard, this.photo)
        .subscribe(async (result) => {
          if (result.status != 0) {
            this.spinnerService.showSpinner();
            const queryJobStatus = async (jobId: string) => {
              try {
                const res = await this.authService.jobQuery(jobId).toPromise();
                this.enroll_state = res.status;
                this.messageLoading = this.messageList[this.messageIndex];
                this.spinnerService.updateMessage(this.messageList[this.messageIndex]);
                if (this.enroll_state === 0) {
                  this.spinnerService.hideSpinner()
                  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                    width: "300px",
                    data: {
                      title: "Thông báo",
                      message: `${res.message}`,
                      showYesNo: false,
                    },
                  });

                  dialogRef.afterClosed().subscribe((response) => {
                    this.enrollCheck();
                  });
                } else if (this.enroll_state === 1) {
                  this.spinnerService.hideSpinner()
                  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                    width: "300px",
                    data: {
                      title: "Thông báo",
                      message: `Upload thành công. Passcode: '${res.passcode}'`,
                      showYesNo: false,
                    },
                  });
                  dialogRef.afterClosed().subscribe((response) => {
                    this.enrollCheck();
                  });
                } else if (this.enroll_state === 2) {
                  this.messageIndex =
                    (this.messageIndex + 1) % this.messageList.length;

                  setTimeout(() => queryJobStatus(result.job_id), 5000);
                }
              } catch (error) {
                console.error("Error in jobQuery: ", error);
              }
            };
            queryJobStatus(result.job_id);
          } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: "300px",
              data: {
                title: "Có lỗi xảy ra",
                message: `Message: ${result.message}`,
                showYesNo: false,
              },
            });
            dialogRef.afterClosed().subscribe((response) => {
              localStorage.removeItem("currentToken");
              this.router.navigate(["/login"]);
            });
          }
        });
    }
  }

  getPasscode() {
    const token = localStorage.getItem("currentToken");
    if (token) {
      this.authService.getPasscode(token).subscribe((result) => {
        if (result.status === 1) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: {
              title: "Thông tin",
              message: ` Passcode của bạn là: ${result.passcode}`,
              showYesNo: false,
            },
          });
          dialogRef.afterClosed().subscribe((response) => {});
        } else {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: {
              title: "Có lỗi xảy ra",
              message: `Message: ${result.message}`,
              showYesNo: false,
            },
          });
          dialogRef.afterClosed().subscribe((response) => {
            localStorage.removeItem("currentToken");
            this.router.navigate(["/login"]);
          });
        }
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
      const username = localStorage.getItem("currentUsername");
      const photo = ["id_card_front_scan"];
      const zip = false;

      if (token && username) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if (res.status != 0) {
              this.image = res.sve_member.id_card_front_scan;
              this.readFrontId = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });

              dialogRef.afterClosed().subscribe((result) => {});
            } else {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: {
                  title: "Có lỗi xảy ra",
                  message: `Message: ${res.message}`,
                  showYesNo: false,
                },
              });
              dialogRef.afterClosed().subscribe((response) => {
                localStorage.removeItem("currentToken");
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
      const username = localStorage.getItem("currentUsername");
      const photo = ["id_card_back_scan"];
      const zip = false;
      if (token && username) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if (res.status != 0) {
              this.image = res.sve_member.id_card_back_scan;
              this.readBackId = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });

              dialogRef.afterClosed().subscribe((result) => {});
            } else {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: {
                  title: "Có lỗi xảy ra",
                  message: `Message: ${res.message}`,
                  showYesNo: false,
                },
              });
              dialogRef.afterClosed().subscribe((response) => {
                localStorage.removeItem("currentToken");
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
      const username = localStorage.getItem("currentUsername");
      const photo = ["photo"];
      const zip = false;
      if (token && username) {
        this.authService
          .enrollImage(token, user_id, member_id, username, photo, zip)
          .subscribe((res) => {
            if (res.status != 0) {
              this.image = res.sve_member.photo;
              this.readPhoto = this.image;
              const dialogRef = this.dialog.open(ImagePopupComponent, {
                data: this.image,
              });

              dialogRef.afterClosed().subscribe((result) => {});
            } else {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: "300px",
                data: {
                  title: "Có lỗi xảy ra",
                  message: `Message: ${res.message}`,
                  showYesNo: false,
                },
              });
              dialogRef.afterClosed().subscribe((response) => {
                localStorage.removeItem("currentToken");
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
