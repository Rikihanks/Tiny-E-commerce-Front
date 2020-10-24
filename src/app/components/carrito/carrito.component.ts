import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.less']
})
export class CarritoComponent implements OnInit {

  carrito: Item[];
  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit() {
    this.carritoService.getCarrito().subscribe(res => {
      this.carrito = res;
      console.log('el carrito ha cambiado', this.carrito);
    })
  }

  removeOne(id: number) {
    let item = this.carrito.filter(p => p.id == id);
    if(item[0].numberOfUnits == 1) {
      this.carrito.splice(this.carrito.indexOf(item[0]), 1);
    }else {
      this.carrito[this.carrito.indexOf(item[0])].numberOfUnits--;
    }
    this.carritoService.setCarrito(this.carrito);
  }

  addOne(id: number) {
    let item = this.carrito.filter(p => p.id == id);
    this.carrito[this.carrito.indexOf(item[0])].numberOfUnits++;
    this.carritoService.setCarrito(this.carrito);
  }

  getTotal() {
    let total = 0.0;
    this.carrito.forEach(item => {
      total+= item.itemPrice * item.numberOfUnits;
    })
    return total.toFixed(2);
  }

  doCheckout() {
    this.router.navigateByUrl("/checkout")
    $('#exampleModal').modal('hide')
  }

  clearCart() {
    Swal.fire({
      title: 'Do you want to empty your cart?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.clearCarrito();
        $('#exampleModal').modal('hide')
      } 
    })

  }


  

}
