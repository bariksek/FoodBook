import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; // important, animation

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

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])
    ])

  ]
})

export class SearchComponent implements OnInit {

  // variables
  itemCount;
  buttonText = 'Add an product';
  productText = '';
  products = ['Bread', 'Potatoes', 'Onion'];
  productsToText = '';
  apiKey = '&app_id=51498885&app_key=13987527ce597b2b662dc0fa755c4054';
  apiWebsite = 'https://api.edamam.com';
  apiRoot = 'https://api.edamam.com/search?q=';
  private data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.itemCount = this.products.length; // on init count products
  }

  addItem() {
    if (this.productText === '') {} else { // if chosen product is empty do nothing
    this.products.push(this.productText);  // else add to the array
    this.productText = ''; // reset productText field
    this.itemCount = this.products.length; // item count++
  }

  }

  removeItem(i) {
    this.products.splice(i, 1);
    this.itemCount = this.products.length;
  }

  getFromApi(url: string) {
    this.http.get<any>(url).subscribe(posts => {
      this.data = posts;
      console.log(this.data);
    });
}

  searchRecipes() {
    this.productsToText = '';
    this.products.forEach(element => {
      this.productsToText += element + ',';
    });
    const url = `${this.apiRoot}` + this.productsToText + this.apiKey;
    console.log(this.productsToText);
    this.getFromApi(url);
  }
}
