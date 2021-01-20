import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './System-administration/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent},
  // { path: 'dashboard', component: TemplateComponent},

  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
