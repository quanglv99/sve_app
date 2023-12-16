import { Route } from "@angular/router";
import { EmployeesComponent } from "./employees.component";

export default [
    { path: '', component: EmployeesComponent },
    
    { path: ':id', loadComponent: () => import('../employees-detail/employees-detail.component').then(r => r.EmployeesDetailComponent) },
] as Route[]