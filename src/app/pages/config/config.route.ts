import { Route } from '@angular/router';
import { ConfigComponent } from './config.component';

export default [
  { path: '', component: ConfigComponent },
  {
    path: 'add-config',
    loadComponent: () => import('../addconfig/addconfig.component').then(r => r.AddconfigComponent)
  },

  {
    path: ':id',
    loadComponent: () => import('../editconfig/editconfig.component').then(r => r.EditconfigComponent)
  }
] as Route[]
