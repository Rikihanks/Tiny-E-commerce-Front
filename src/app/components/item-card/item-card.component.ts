import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.less']
})
export class ItemCardComponent implements OnInit {

  @Input() item: Item; 
  
  private carrito : Item[];
  constructor(private carritoService:CarritoService) { }

  ngOnInit() {
    this.item.numberOfUnits = 1;
    this.carritoService.getCarrito().subscribe(res => {
      this.carrito = res;
    })
  }

  addToCart() {
    if(this.carrito == null) {
      this.carrito = []
    }
    if(this.carrito.findIndex(p => p.id == this.item.id) != -1) {
      this.carrito[this.carrito.indexOf(this.item)].numberOfUnits++;
    }else {
      this.carrito.push(this.item);
    }
    this.carritoService.setCarrito(this.carrito);
    
    Swal.fire({
      position: 'bottom-end',
      title: 'Added to cart',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 800,
      backdrop: null
    });
  }

}
