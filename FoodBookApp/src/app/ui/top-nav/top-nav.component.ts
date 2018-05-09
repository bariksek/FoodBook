import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public isLogin: boolean;
  public username: string;
  public userEmail: string;
  public usernamePhoto: string;
  constructor(
    private _cookieService: CookieService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.username = auth.displayName;
        this.userEmail = auth.email;
        this.usernamePhoto = auth.photoURL;
      } else {
        this.isLogin = false;
      }
    });
  }

  onClickLogout() {
    this.authService.logout();
    this._cookieService.removeAll();
  }

}
