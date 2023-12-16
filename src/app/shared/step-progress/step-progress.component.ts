import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent {
  @Input() steps:{ id:number , name: string }[] = [];
  @Input() currentStep: number = 0;
}
