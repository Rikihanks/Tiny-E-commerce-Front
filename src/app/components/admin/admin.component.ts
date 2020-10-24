import { Component, OnInit } from '@angular/core';
import { OrderIn } from 'src/app/model/orderIn';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  orders: OrderIn [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
    })
  }

  getTotal(order: OrderIn) {
    let total = 0.0;
      order.items.forEach(item => {
        total+= item.itemPrice;
    })
    return total;
  }

  prepareProcessOrder(order: OrderIn) {
    Swal.fire({
      title: 'Do you want to process this order?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.orderService.processOrder(order).subscribe(res => {
          order.processed = !order.processed;
        }, err => { console.log(err); }
        );
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Order processed!',
        );
      }
    });
  }

}
