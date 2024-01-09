import { Component } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";
import { TasksComponent } from "./components/tasks/tasks.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
@Component({
    selector: "app-dashboard",
    standalone: true,
    providers: [
        DatePipe
    ],
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    imports: [
        CommonModule,
        RouterModule,
        MatExpansionModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
        TasksComponent,
        MatDialogModule,
        MatPaginatorModule
    ]
})
export class DashboardComponent {
  constructor(private datePipe: DatePipe)
  {}

  myDate = new Date();
  formattedDate = this.datePipe.transform(this.myDate, 'dd MMM yyyy, EEEE');
}
