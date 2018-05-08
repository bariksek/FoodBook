import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; // important, animation


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
  myStatusExp = 'something';
  // variables
  isProduct;
  itemCount;
  buttonText = 'Add an product';
  productText = '';
  products = [];
  constructor() { }

  ngOnInit() {
    this.itemCount = this.products.length; // on init count products
    this.productCheck();
  }

  productCheck() {
    if (this.itemCount === 0) {
      this.isProduct = false;
    } else { this.isProduct = true; }
  }

  addItem() {
    if (this.productText === '') { } else { // if chosen product is empty do nothing
      this.products.push(this.productText);  // else add to the array
      this.productText = ''; // reset productText field
      this.itemCount = this.products.length; // item count++
      this.productCheck();
    }

  }

  removeItem(i) {
    this.products.splice(i, 1);
    this.itemCount = this.products.length;
    this.productCheck();
  }
}
