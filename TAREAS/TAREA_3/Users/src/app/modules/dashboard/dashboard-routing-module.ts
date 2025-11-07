import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Employees } from './pages/employees/employees';

const routes: Routes = [
  {path: '', component:Home},
  {path: 'employees', component:Employees},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
