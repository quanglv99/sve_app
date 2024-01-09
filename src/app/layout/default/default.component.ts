import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MenuItems } from "../../shared/const/menu-items";
import { AuthService } from "src/app/services/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LoadingService } from "src/app/services/loading.service";
import { InterceptorService } from "src/app/services/interceptor.service";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-default",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  providers: [MenuItems,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  userLogin!: string;
  branchname!: string;
  loading: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen: boolean = false;

  
  constructor(
    public menuItems: MenuItems,
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    const userFulname = localStorage.getItem("currentUserFullname");
    const branch = localStorage.getItem("branchname");
    if (userFulname) {
      this.userLogin = userFulname;
    }
    if (branch) {
      this.branchname = branch;
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
    this.isSidenavOpen = this.sidenav.opened;
  }

  onSigout() {
    const token = localStorage.getItem("currentToken");
    this.authService.logout(token).subscribe((response) => {
      this.router.navigate(["login"]);
    });
  }
}
