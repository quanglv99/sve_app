import { Route } from '@angular/router';
import { MyAssignComponent } from './my-assign.component';

export default [
  { path: '', component: MyAssignComponent },
  {
    path: 'register-assign', 
    loadComponent: () => import('../register-assign/register-assign.component').then(r => r.RegisterAssignComponent)
  },
] as Route[]