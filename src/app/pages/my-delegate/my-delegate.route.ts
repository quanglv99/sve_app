import { Route } from '@angular/router';
import { MyDelegateComponent } from './my-delegate.component';

export default [
  {
    path: '',
    component: MyDelegateComponent,
  },
  {
    path: 'register-delegate',
    loadComponent: () =>
      import('../register-delegate/register-delegate.component').then(
        (r) => r.RegisterDelegateComponent
      ),
  },
] as Route[];
