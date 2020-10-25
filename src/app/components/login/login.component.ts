import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {flatMap, map, mergeMap, tap} from 'rxjs/operators';
import { UserLoggedIn } from 'src/app/model/userLoggedin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  credentialError: boolean;
  sessionNotValidParam = false;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     if(params.sessionNotValid != null) {
      this.sessionNotValidParam = params.sessionNotValid;
     }
    })
  
  }


  public doLogin() {
    const userInfo = {userName: this.username, password: this.password};

    this.userService.login(userInfo).pipe(
      tap(token => this.userService.setToken(token)),
      flatMap(u => this.userService.getUserInfo(userInfo.userName))
    ).subscribe(user => {
      this.userService.setUser(user); 
      this.router.navigateByUrl("/home"); 
      this.credentialError = false
    }, 
    err => {
      if(err.error = "unauthorized" || err.error_description == "Bad credentials") {
        this.credentialError = true;
      }
    });
    
    
  }
}
