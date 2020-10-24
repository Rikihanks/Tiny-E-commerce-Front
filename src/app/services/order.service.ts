import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { OrderIn } from '../model/orderIn';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: OrderIn[];
  constructor(private http: HttpClient, private userService: UserService) { }

  getOrders():Observable<any> {
    return this.http.get(`http://localhost:8080/private/orders/getOrders?access_token=${this.userService.getToken().access_token}`)
  }

  createOrder(order: Order):Observable<any> {
    return this.http.post(`http://localhost:8080/private/orders/createOrder?access_token=${this.userService.getToken().access_token}`, order);
  
  }

  processOrder(orderIn: OrderIn):Observable<any> {
    let order: Order = {
      id: orderIn.id,
      userId: orderIn.user.id,
      address: orderIn.address,
      country: orderIn.country,
      creditCardNumber: orderIn.creditCardNumber,
      postalCode: orderIn.postalCode,
      processed: !orderIn.processed,
      itemIds: []
    };
    orderIn.items.forEach(item => {
      order.itemIds.push(item.id)
    })
    
    return this.http.post(`http://localhost:8080/private/orders/updateOrder?access_token=${this.userService.getToken().access_token}`, order);
  }
}
