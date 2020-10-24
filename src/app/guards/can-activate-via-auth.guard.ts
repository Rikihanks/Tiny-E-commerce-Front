import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) { }

  canActivate() {
     // If the user is not logged in we'll send them back to the home page
     if (!this.authService.isUserLoggedIn()) {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
     }
    return true;
  }
  
  
}
