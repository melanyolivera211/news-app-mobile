import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { User as UserService } from '@core/services/storage/user/user';
import { User } from '@models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  public user: User = this.userService.get() as User;

  public isScrolled = false;
  public sidebarOpen = false;

  @HostListener('window:scroll', []) onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = offset > 10;
  }

  public constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public ngOnInit() {}

  public toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  public onLogout() {
    this.router.navigate(['/']);
  }
}
