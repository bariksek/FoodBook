import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; // important, animation
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './product';
import { CookieService } from 'ngx-cookie';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { app } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Post } from './PostInterface';
import { Observable } from 'rxjs/Observable';


@Component({  // don't touch this section. It is responsible for animation of the list.
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('products', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ]
})

export class SearchComponent implements OnInit {

  isProduct;
  itemCount;
  i;
  buttonText = 'Add an product';
  productText = '';
  productTab = [];
  cookieTab;
  productsToText = '';
  apiKey = 'a907d86f069da4a61ca8b890f77a476e';
  apiWebsite = 'http://food2fork.com/';
  apiRoot = '/api/search?key=' + this.apiKey + '&q=';

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  ngOnInit() {
    this.productsFromCookie();
    this.itemCount = this.productTab.length; // on init count products
    this.productCheck();
  }

  productCheck() {
    if (this.itemCount === 0) {
      this.isProduct = false;
      this._cookieService.removeAll();
    } else { this.isProduct = true; }
  }

  productsFromCookie() {
    this.cookieTab = this._cookieService.getAll();
    console.log(this._cookieService.getAll());
    for (this.i = 0; ; this.i++) {
      if (this.cookieTab[this.i] === undefined) { console.log('Cookie wczytane'); break; }
      // tslint:disable-next-line:one-line
      else { this.productTab[this.i] = this.cookieTab[this.i]; }
    }
    console.log(this.productTab);
  }

  addItem() {
    if (this.productText === '') { } else { // if chosen product is empty do nothing
      this.productTab.push(this.productText);  // else add to the array
      this._cookieService.put(this.itemCount, this.productText);
      console.log('adding "' + this.productText + '" to cookies.');
      this.productText = ''; // reset productText field
      this.itemCount = this.productTab.length; // item count++
      this.productCheck();
    }
  }

  removeItem(i) {
    console.log('Cookie "' + this.productTab[i] + '" usuniete');
    this.productTab.splice(i, 1);
    this._cookieService.remove(i);
    this.itemCount = this.productTab.length;
    this.productCheck();
    console.log(this.productTab);
  }

  getObservableFromApi(url: string):  Observable<Array<Post>> {
    return this.http.get<Array<Post>>(url);
}

  getFromApi(url: string) {
    this.getObservableFromApi(url).subscribe(posts => {
      console.log(posts);
    });
}

  searchRecipes() {
    this.productsToText = '';
    this.productTab.forEach(element => {
      this.productsToText += element + ',';
    });
    const url = `${this.apiRoot}` + this.productsToText;
    console.log(this.productsToText);
    this.getFromApi(url);


  }
}
