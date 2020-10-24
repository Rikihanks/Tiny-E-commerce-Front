import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../model/item';
import { OrderIn } from '../model/orderIn';

@Pipe({
  name: 'item'
})
export class ItemPipe implements PipeTransform {


  transform(value: any, ...args: any[]): any {
    let val: Item[] = value;
    let res = "[";
    val.forEach(order => {
      res = res.concat(order.id+ ", ");
    })
    res.trim();
    res = res.substr(0, res.length -2);
    res = res.concat("]");
    return res;
  }

}
