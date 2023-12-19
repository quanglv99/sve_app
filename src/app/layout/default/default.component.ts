import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MenuItems } from "../../shared/const/menu-items";
import { NgToastModule } from "ng-angular-popup";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-default",
  standalone: true,
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
  ],
  providers: [MenuItems],
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  userLogin!: string;
  constructor(
    public menuItems: MenuItems,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
     const userFulname = localStorage.getItem("currentUserFullname");
     if(userFulname)
     {
      this.userLogin = userFulname
     }
  }

  onSigout() {
    const token = localStorage.getItem("currentToken");
    this.authService.logout(token).subscribe((response) => {
      this.router.navigate(["login"]);
    });
  }
}
