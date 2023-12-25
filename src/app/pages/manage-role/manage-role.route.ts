import { Route } from '@angular/router';
import { ManageRoleComponent } from './manage-role.component';
export default [
  { path: '', component: ManageRoleComponent },
  {
    path: 'add-role-group',
    loadComponent: () => import('../add-role-group/add-role-group.component').then(r => r.AddRoleGroupComponent)
  }
//   ,
//   {
//     path: ':id',
//     loadComponent: () => import('../manage-role-detail/manage-role-detail.component').then(r => r.ManageRoleDetailComponent)
//   }
] as Route[]
