import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { DataService } from '../../data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  isLoggedIn: boolean;
  public isLogin: boolean;
  public username: string;
  public userEmail: string;
  public userPhoto: string;
  constructor(
    private _cookieService: CookieService,
    public authService: AuthService,
    private data2: DataService
  ) { }

  ngOnInit() {
    this.data2.currentMessage.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.data2.changeMessage(true);
        this.username = auth.displayName;
        this.userEmail = auth.email;
        this.userPhoto = auth.photoURL;
        console.log(auth.email);
        if (this.userPhoto === null) {
          this.userPhoto = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
        }
        if (this.username === null) {
          this.username = this.userEmail;
        }
      } else {
        this.isLogin = false;
        this.data2.changeMessage(false);
      }
    });
  }

  onClickLogout() {
    this.authService.logout();
    this._cookieService.removeAll();
  }

}
