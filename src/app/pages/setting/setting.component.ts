import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule,RouterModule,MatCardModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

}
