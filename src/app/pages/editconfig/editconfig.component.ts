import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ConfigComponent } from '../config/config.component';
import { ActivatedRoute } from '@angular/router';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-editconfig',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [ConfigComponent],
  templateUrl: './editconfig.component.html',
  styleUrls: ['./editconfig.component.scss'],
})
export class EditconfigComponent implements OnInit, OnDestroy {
  data: any;
  subscription!: Subscription;
  members = new FormControl('');
  memberList = MEMBER_LIST;
  editConfigForm!: FormGroup;
  isDisable: boolean = false;
  isFormDirty: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigComponent,
    private dataService: ConfigService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.dataService.getConfigData().subscribe((data) => {
      if (data) {
        this.data = data;
      } else {
        const id = Number(this.route.snapshot.paramMap.get('id'));

      }
      this.createForm();
    });

    this.editConfigForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editConfigForm.dirty;
    });
    this.editConfigForm = this.formBuilder.group({
      inputConfig: [{ value: this.data.nameConfig, disabled: this.isDisable }],
      members: [
        this.data.members.map((member: { name: any }) => member.name),
        { value: this.data.members, disabled: this.isDisable },
      ],
      noteConfig: [{ value: this.data.noteConfig, disabled: this.isDisable }],
    });

    this.editConfigForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editConfigForm.dirty;
    });
  }



  createForm(): void {
    this.editConfigForm = this.formBuilder.group({
      inputConfig: { value: this.data?.nameConfig },
      ingredientConfig: { value: this.data?.ingredientConfig },
      noteConfig: { value: this.data?.noteConfig },
    });
  }
}
