import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; // important, animation

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
  apiKey = 'a907d86f069da4a61ca8b890f77a476e';
  apiWebsite = 'http://food2fork.com/';
  apiRoot = '/api/search?key=' + this.apiKey + '&q=';

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
    this.products.forEach(element => {
      this.productsToText += element + ',';
    });
    const url = `${this.apiRoot}` + this.productsToText;
    console.log(this.productsToText);
    this.getFromApi(url);


  }
}
