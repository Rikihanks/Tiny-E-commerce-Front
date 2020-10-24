import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito = new BehaviorSubject<Item[]>([]);

  constructor() { }

  getCarrito(): Observable<Item[]> {
    let carritoStorage = JSON.parse(window.localStorage.getItem("carrito"))
    if(carritoStorage != null) {
      this.carrito.next(carritoStorage);
    }
    return this.carrito.asObservable();
  }

  setCarrito(carrito: Item[]) {
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    this.carrito.next(carrito);
  }

  clearCarrito() {
    this.carrito.value.forEach(item => {
      item.numberOfUnits = 1;
    })
    this.setCarrito([]);
  }
}
