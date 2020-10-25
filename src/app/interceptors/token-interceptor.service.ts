import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private userService: UserService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.userService.getToken();

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401 ) {
          if(err.error.error == "invalid_token") {
            console.log('token caducado intentamos renovarlo');
            this.userService.updateToken(token.refresh_token);
          }
        }
        if(err.status === 400) {
          console.log('no se puede renovar token redireccionamos a login');
          this.userService.doLogout();
          this.router.navigate(['/login'],  { queryParams: { sessionNotValid: 'true' } });
        }

        return throwError( err );

      })
    );
  }
}
