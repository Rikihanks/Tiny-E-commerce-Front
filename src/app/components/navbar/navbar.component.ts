import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { UserLoggedIn } from 'src/app/model/userLoggedin';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  user: UserLoggedIn;
  carrito: Item[];
  constructor(private userService: UserService, private router: Router, private carritoService: CarritoService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    })
    this.carritoService.getCarrito().subscribe(carrito => {
      this.carrito = carrito;
    })
  }

  isAdmin():boolean {
    return this.userService.isAdmin();
  }

  doLogout() {
    this.userService.doLogout();
    this.router.navigateByUrl("/login");
  }

  getItemCount() {
    let total =  0;
    this.carrito.forEach(item => total += item.numberOfUnits)
    return total;
  }

}
