import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesComponent } from '../employees/employees.component';
import { ActivatedRoute } from '@angular/router';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { result } from 'lodash';

@Component({
  selector: 'app-employees-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [EmployeesComponent],
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.scss'],
})
export class EmployeesDetailComponent implements OnInit, OnDestroy {
  data: any;
  private subscription!: Subscription;
  bioStatus!: string;
  constructor(
    private emService: EmployeeService,
    private employee: EmployeesComponent,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.subscription = this.emService.getMemberData().subscribe((result) => {
      if (result) {
        this.data = result;
      }
      else{
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
          this.getEmployeeData(id);
        }
      }
    });
  }

  getEmployeeData(id: number): void {
    this.http.get(this.appService.getUserDetail()).subscribe(
      (result: any) =>
      {
        if(result)
        {
          this.data = result.find( (r: { id: number; }) => r.id == id)
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(image: any): void {
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: image,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
