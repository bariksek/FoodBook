import { Component, OnInit } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/';
import { AuthService } from './services/auth.service';
import { FavouriteService } from '../app/services/favourite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }

  /* ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      this.favouriteService.currentUser = auth.displayName;
       console.log('Wykryto użytkownika: ' + auth.displayName + ', podpinam do osobistej bazy ulubionych.');
   });
   console.log('Pomyslnie połączono z bazą danych.');
  } */
}
