import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../model/item';

@Pipe({
  name: 'itemFull'
})
export class ItemFullPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let val: Item[] = value;
    let res = "";
    val.forEach(order => {
      res = res.concat("[ " +order.id+ ", "+order.itemName+ ", "+order.description+" ]");
    })
    res = res.concat("");
    return res;
  }

}
