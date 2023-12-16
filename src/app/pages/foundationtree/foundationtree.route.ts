import { Route } from '@angular/router';
import { FoundationtreeComponent } from './foundationtree.component';

export default [
  { path: '', component: FoundationtreeComponent },
  {
    path: 'add-config',
    loadComponent: () => import('../addconfig/addconfig.component').then(r => r.AddconfigComponent)
  }
] as Route[]
