import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; // important, animation
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './product';

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

  // variables
  isProduct;
  itemCount;
  buttonText = 'Add an product';
  productText = '';
  productTab = ['test'];
  products: any[];

  constructor(public db: AngularFireDatabase) {
    db.list('/products')
    .valueChanges()
    .subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  addItem() {
    this.db.list('/products').push({ name: this.productText });
    this.productText = '';
  }

  /* deleteItem() {
    this.db.list('/products').remove({ });
    this.productText = '';
  } */

  ngOnInit() {

    this.itemCount = this.productTab.length; // on init count products
    this.productCheck();
  }

  productCheck() {
    if (this.itemCount === 0) {
      this.isProduct = false;
    } else { this.isProduct = true; }
  }
}



  /* addItem() {
    if (this.productText === '') { } else { // if chosen product is empty do nothing
      this.productTab.push(this.productText);  // else add to the array
      this.productText = ''; // reset productText field
      this.itemCount = this.productTab.length; // item count++
      this.productCheck();
    } */



 /*  removeItem(i) {
    this.productTab.splice(i, 1);
    this.itemCount = this.productTab.length;
    this.productCheck();
  } */


