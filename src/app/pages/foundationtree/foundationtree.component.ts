import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { VaultConfigModel } from 'src/app/shared/models/vault-config.models';
interface FoundationNode {
  id: number,
  name: string,
  code: string,
  vaultConfig: VaultConfigModel,
  children?: FoundationNode[],
}

const TREE_DATA: FoundationNode[] = [
  {
    id: 1,
    name: 'VIB',
    code: "RB",
    vaultConfig: {
      id: 1,
      nameConfig: "Config 1",
      members: [],
      noteConfig: "Note for Config 1",
      status:"active"
    },
    children: [
      {
        id: 1,
        name: 'Mạng lưới',
        code: "RBBN",
        vaultConfig: {
          id: 1,
          nameConfig: "Config 1",
          members: [],
          noteConfig: "Note for Config 1",
          status:"active"
        },
        children: [
          {
            id: 1,
            name: 'Vùng Đông Bắc Hà Nội',
            code: "RBBN01",
            vaultConfig: {
              id: 1,
              nameConfig: "Config 1",
              members: [],
              noteConfig: "Note for Config 1",
              status:"active"

            },
            children: [
              {
                id: 1,
                code: "RBBN0101",
                name: 'Chi Nhánh Đông Bắc Hà Nội',
                vaultConfig: {
                  id: 1,
                  nameConfig: "Config 1",
                  members: [],
                  noteConfig: "Note for Config 1",
                  status:"active"
                },
              }
            ]
          },
          {
            id: 2,
            code: "RBBN02",
            name: 'Vùng Tây Hà Nội',
            vaultConfig: {
              id: 1,
              nameConfig: "Config 1",
              members: [],
              noteConfig: "Note for Config 1",
              status:"active"
            },
            children: [

            ]
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-foundationtree',
  standalone: true,
  imports: [
    MatTreeModule, MatButtonModule, MatIconModule, MatCardModule,
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
    MatDialogModule,
  ],
  templateUrl: './foundationtree.component.html',
  styleUrls: ['./foundationtree.component.scss']
})
export class FoundationtreeComponent implements OnInit {
  isOpen = false;
  jobcodes: any;
  addFoundationTreeForm!: FormGroup;
  selectedNode: FoundationNode | null = null;
  data: any;
  treeControl = new NestedTreeControl<FoundationNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoundationNode>();
  branchForm!: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
    this.initFormValue();
  }

  hasChild = (_: number, node: FoundationNode) => !!node.children && node.children.length > 0;

  onSelectNode(event: any) {
    this.isOpen = true;
    this.data = event;
    this.branchForm.get('branchCode')?.setValue(event.code);
    this.branchForm.get('branchName')?.setValue(event.name);
    this.branchForm.get('configName')?.setValue(event.vaultConfig.nameConfig);
  }
  initFormValue() {
    this.branchForm = this.formBuilder.group({
      branchCode:[''],
      branchName:[''],
      configName:[''],
    })
  }

  isNodeDisabled(): boolean {
    return !!this.selectedNode && (this.selectedNode.name === 'VIB' || this.selectedNode.name === 'Mạng lưới');
}


}
