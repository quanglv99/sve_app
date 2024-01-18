import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-call-support-popup',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './call-support-popup.component.html',
  styleUrls: ['./call-support-popup.component.scss']
})
export class CallSupportPopupComponent {
  @ViewChild('reason', { static: false }) input!: ElementRef
  constructor(
    public dialogRef: MatDialogRef<CallSupportPopupComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const reason = this.input.nativeElement.value
    this.dialogRef.close(reason); 
  }
}
