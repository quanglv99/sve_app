import { Route } from '@angular/router';
import { DefaultComponent } from './default.component';

export default [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'my-assign',
        loadChildren: () => import('../../pages/my-assign/my-assign.route'),
      },
      {
        path: 'received-assign',
        loadComponent: () =>
          import('../../pages/received-assign/received-assign.component').then(
            (c) => c.ReceivedAssignComponent
          ),
      },
      {
        path: 'my-delegate',
        loadChildren: () => import('../../pages/my-delegate/my-delegate.route'),
      },
      {
        path: 'received-delegate',
        loadComponent: () =>
          import(
            '../../pages/received-delegate/received-delegate.component'
          ).then((c) => c.ReceivedDelegateComponent),
      },
      {
        path: 'approve-delegate',
        loadComponent: () =>
          import(
            '../../pages/approve-delegate/approve-delegate.component'
          ).then((c) => c.ApproveDelegateComponent),
      },
      {
        path: 'jobcode',
        loadChildren: () => import('../../pages/jobcode/jobcode.route'),
      },

      {
        path: 'setting',
        loadChildren: () => import('../../pages/setting/setting.route'),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'biometric-support',
        loadComponent: () =>
          import(
            '../../pages/biometric-support/biometric-support.component'
          ).then((c) => c.BiometricSupportComponent),
      },
      {
        path: 'employees',
        loadChildren: () => import('../../pages/employees/employee.route'),
      },
      {
        path: 'approve-assign',
        loadComponent: () =>
          import('../../pages/approve-assign/approve-assign.component').then(
            (c) => c.ApproveAssignComponent
          ),
      },
      {
        path: 'manage-role',
        loadChildren: () => import('../../pages/manage-role/manage-role.route'),
      },
      {
        path: 'vault-configuration',
        loadChildren: () => import('../../pages/config/config.route'),
      },
      {
        path: 'vault-member',
        loadChildren: () => import('../../pages/member/member.route'),
      },
      {
        path: 'jobcodes',
        loadChildren: () => import('../../pages/jobcode/jobcode.route'),
      },
      {
        path: 'forced-vault-member',
        loadChildren: () => import('../../pages/member-force/member-force.route'),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
] as Route[];
