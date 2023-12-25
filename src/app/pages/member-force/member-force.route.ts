import { MemberForceComponent } from './member-force.component';
import { Route } from '@angular/router';

export default [
  { path: '', component: MemberForceComponent },
  {
    path: 'add-member-force',
    loadComponent: () => import('../add-members-force/add-members-force.component').then(r => r.AddMembersForceComponent)
  }
] as Route[]
