import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  items: Item[];
  actual: number;
  filteredItems: Item[];
  categories: string [] = [];
  filteringByCat: boolean =false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.filteredItems = this.items;
      this.items.forEach(item => {
        if(this.categories.findIndex(p => p === item.category) == -1) {
          this.categories.push(item.category)
        }
      })
      this.actual = Number.parseFloat(this.getMin());
    })
  }

  filterByCategory(cat: string) {
    if(cat == null) {
      this.filteringByCat = false;
      this.filteredItems = this.items;
    }else {
      this.filteringByCat = true;
      this.filteredItems = this.items.filter(item => item.category === cat)
    }
    this.actual = Number.parseFloat(this.getMin());
  }

  applyPriceFilter() {
    if(this.filteringByCat) {
      this.filteredItems = this.filteredItems.filter(i => i.itemPrice <= this.actual);
      return;
    }
    this.filteredItems = this.items.filter(i => i.itemPrice <= this.actual);
  }

  resetPriceFilter() {
    this.filteredItems = this.items;
    this.actual = Number.parseFloat(this.getMin());
  }

  getMin() {
    let prices;
    if(this.filteringByCat) {
      prices  = this.filteredItems.map(i => i.itemPrice)
    }else {
      prices = this.items.map(i => i.itemPrice)
    }
    return Math.min(...prices).toFixed(2);
  }

  getMax() {
    let prices;
    if(this.filteringByCat) {
      prices  = this.filteredItems.map(i => i.itemPrice)
    }else {
      prices = this.items.map(i => i.itemPrice)
    }
    return Math.max(...prices).toFixed(2);
  }

}
