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
import { Observable } from 'rxjs/Observable';
import { createWiresService } from 'selenium-webdriver/firefox';
import { ApiClass } from './ApiClass';
import { Hits } from './Hits';


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
  apiKey = '&app_id=51498885&app_key=13987527ce597b2b662dc0fa755c4054';
  apiWebsite = 'https://api.edamam.com';
  apiRoot = 'https://api.edamam.com/search?q=';
  private data: any;

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

  getFromApi(url: string) {
    this.http.get<any>(url).subscribe(posts => {
      this.data = posts;
      console.log(this.data);
    });
}

  searchRecipes() {
    this.productsToText = '';
    this.productTab.forEach(element => {
      this.productsToText += element + ',';
    });
    const url = `${this.apiRoot}` + this.productsToText + this.apiKey;
    console.log(this.productsToText);
    this.getFromApi(url);
  }
}
