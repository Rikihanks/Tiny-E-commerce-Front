import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { UserLoggedIn } from '../model/userLoggedin';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private headers = new HttpHeaders({'authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0' });
  private options = { headers: this.headers };

  constructor(private http: HttpClient, private carritoService: CarritoService) { }

  private user = new BehaviorSubject<UserLoggedIn>(JSON.parse(window.localStorage.getItem("user")));

  login(user: any): Observable<any> {
    return this.http.post(`http://localhost:8080/oauth/token?grant_type=password&username=${user.userName}&password=${user.password}`, null, this.options);
  }

  registerUser(username: string, surname: string, password: string, dni: string, email: string): Observable<any> {
    let user = {
      username: username,
      surname: surname,
      password: password,
      dni: dni,
      email: email
    }
    return this.http.post(`http://localhost:8080/private/users/createUser`, user);
  }

  setToken(token: any) {
    window.localStorage.setItem("token", JSON.stringify(token));
    if(token != null) {
      this.startCountdownToRefreshToken(token);
    }
  }

  getToken() {
    let token = JSON.parse(window.localStorage.getItem("token"));
    return token != null? token: null;
  }

  isUserLoggedIn() {
    return this.getToken() != null;
  }

  setUser(user: any) {
    window.localStorage.setItem("user", JSON.stringify(user));
    this.user.next(user);
  }

  getUser(): Observable<UserLoggedIn> {
    return this.user.asObservable();
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`http://localhost:8080/private/users/getUserDetails?access_token=${this.getToken().access_token}&userName=${username}`);
  }

  isAdmin(): boolean {
    return this.user.value.roles.filter(f => f.name.includes("ROLE_ADMIN")).length > 0;
  }

  doLogout() {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    this.carritoService.clearCarrito();
    this.user.next(null)

  }

  private startCountdownToRefreshToken(token: any) {
    const minutosExpiracionToken = (token.expires_in - 50) / 60;
    console.log('el token expira en : ' + minutosExpiracionToken + 'minutos');
    let timeInterval = null;
    clearInterval(timeInterval);
    timeInterval = setInterval(() => {this.updateToken(token.refresh_token)},(minutosExpiracionToken*60000));
  }

  updateToken(refreshToken: number) {
    console.log("renovando token")
    this.http.post(`http://localhost:8080/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, null, this.options).subscribe(res => {
      this.setToken(res)
    })
  }
}
