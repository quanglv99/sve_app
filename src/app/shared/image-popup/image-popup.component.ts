import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss'],
})
export class ImagePopupComponent implements OnInit {
  image!:string
  constructor(@Inject(MAT_DIALOG_DATA) public imageURL: string,
  private dialogRef: MatDialogRef<ImagePopupComponent>,
  ) {
  }
  ngOnInit(): void {
    this.image = "data:image/png;base64, "+ this.imageURL
  }

  onClose()
  {
    this.dialogRef.close();
  }
  
}
