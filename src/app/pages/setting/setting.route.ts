import { Route } from '@angular/router';
import { SettingComponent } from './setting.component';

export default [
  { path: '', component: SettingComponent},
  {
    path: 'config',
    loadChildren: () => import('../../pages/config/config.route'),
  },

  {
    path: 'member',
    loadChildren: () => import('../../pages/membercontrol/membercontrol.route')
  },

  {
    path: 'jobcode',
    loadChildren: () => import('../../pages/jobcode/jobcode.route')
  },
{
  path: 'foundationtree',
  loadChildren: ()=> import('../../pages/foundationtree/foundationtree.route')
},
{
  path: 'manage-role',
  loadChildren: ()=> import('../../pages/manage-role/manage-role.route')
}

] as Route;
