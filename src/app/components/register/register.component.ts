import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  username: string;
  surname: string;
  password: string;
  dni: string;
  email: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  async doRegister() {
    this.userService.registerUser(this.username, this.surname, this.password, this.dni, this.email).subscribe(async res => {
      await Swal.fire(
        'Registered!',
        'You can use your credentials to log in now!',
        'success'
      );
      this.router.navigateByUrl("/login")
    }, err => {
      Swal.fire(
        'Error',
        'It looks like it has been an error performing this operation, try again later',
        'error'
      )
    })
  }

}
