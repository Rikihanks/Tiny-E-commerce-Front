import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CanActivateViaAuthGuard } from './guards/can-activate-via-auth.guard';
import { CanActivateViaRoleGuard } from './guards/can-activate-via-role.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'admin', component: AdminComponent, canActivate: [CanActivateViaRoleGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [CanActivateViaAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
