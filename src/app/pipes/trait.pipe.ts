import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trait'
})
export class TraitPipe implements PipeTransform {

  /**
   * Returns the name of the item shortened
   */

  transform(value: string, ...args: any[]): string {
    return value.length > 25 ? value.substr(0, 25) : value;
  }

}
