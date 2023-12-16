import { Route } from '@angular/router';
import { JobcodeComponent } from './jobcode.component';

export default [
  { path: '', component: JobcodeComponent },
  {
    path: 'add-jobcode',
     loadComponent: () => import('../addjobcode/addjobcode.component').then(r => r.AddjobcodeComponent)
   },
  // {
  //   path: ':id',
  //   loadComponent: () => import('../editconfig/editconfig.component').then(r => r.EditconfigComponent)
  // }
] as Route[]
