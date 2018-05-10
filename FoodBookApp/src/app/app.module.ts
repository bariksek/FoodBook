import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/home/home.component';
import { SearchComponent } from './ui/search/search.component';
/* import { CoreComponent } from './core/core.component'; */
import { RecipeComponent } from './recipe/recipe.component';
import { FridgeComponent } from './fridge/fridge.component';
import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CookieModule } from 'ngx-cookie';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FavouritesComponent } from './favourites/favourites.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    RecipeComponent,
    FridgeComponent,
    TopNavComponent,
    LoginComponent,
    RegisterComponent,
    PrivatePageComponent,
    NotFoundPageComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // added for animation purposes
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlashMessagesModule

  ],
  providers: [AuthService, FlashMessagesService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
