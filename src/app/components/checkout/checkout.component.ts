import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Order } from 'src/app/model/order';
import { CarritoService } from 'src/app/services/carrito.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit {

  order: Order;
  carrito: Item[];
  constructor(private carritoService: CarritoService, private orderService: OrderService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.order = {id: null, address: null, country: null, postalCode: null, creditCardNumber: null, userId: null, processed: false, itemIds: []};
    this.carritoService.getCarrito().subscribe(res => {
      this.carrito = res;
    })
  }

  prepareCheckout() {
    this.carrito.forEach(item => {
      for (let i = 0; i < item.numberOfUnits; i++) {
        this.order.itemIds.push(item.id);    
      }
    })
    this.userService.getUser().subscribe(userInfo => {
      this.order.userId = userInfo.id;
    })
    this.createOrder();
    
  }


  private createOrder() {
    Swal.fire({
      title: 'Confirm checkout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.orderService.createOrder(this.order).subscribe(res => {
        }, err => { console.log(err); }
        );
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Order created!',
        );
        this.router.navigateByUrl("/home")
        this.carritoService.clearCarrito();
      }
    });
  }
}
