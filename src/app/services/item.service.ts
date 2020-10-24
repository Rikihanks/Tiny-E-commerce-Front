import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../model/item';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private userService: UserService) { }

  private items = new BehaviorSubject<Item[]>([]);

  getItems() {
    this.http.get(`http://localhost:8080/private/items/getItems?access_token=${this.userService.getToken().access_token}`).subscribe(res => {
      if(res != null) {
        this.setItems(res);
      }
    })
    return this.items.asObservable();
  }

  setItems(items: any) {
    this.items.next(items);
  }
}
