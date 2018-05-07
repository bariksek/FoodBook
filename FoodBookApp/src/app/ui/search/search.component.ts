import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; // important, animation


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
  constructor() { }

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

  searchRecipes() {
    this.productsToText = '';
    this.products.forEach(element => {
      this.productsToText += element + ', ';
    });
    console.log(this.productsToText);
  }
}
