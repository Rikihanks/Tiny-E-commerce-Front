import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private userService: UserService) { }

  private items = new BehaviorSubject<Item[]>([]);

  getItems() {
    this.http.get(`${environment.baseUrl}private/items/getItems?access_token=${this.userService.getToken().access_token}`).subscribe(res => {
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
