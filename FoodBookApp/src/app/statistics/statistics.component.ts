import { Component, OnInit, Input } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { Favourite } from '../services/favourite';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() favourite: Favourite;
  favourites: Observable<Favourite[]>;

  constructor(private favouriteService: FavouriteService) {
    this.favourites = this.favouriteService.getItemsList();
   }

  ngOnInit() {
  }

}
