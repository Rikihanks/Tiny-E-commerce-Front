import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateViaRoleGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {}

  canActivate() {
    if (!this.authService.isAdmin()) {
     console.log('No eres admin');
     this.router.navigate(['/forbidden']);
     return false;
    }
   return true;
 }
  
}
