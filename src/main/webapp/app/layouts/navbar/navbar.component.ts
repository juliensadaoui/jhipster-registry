import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { ProfileService } from 'app/layouts/profiles/profile.service';

import { VERSION } from 'app/app.constants';
import { Subject, Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { EventManager } from 'app/core/event-manager/event-manager.service';
import { LoginService } from 'app/login/login.service';
import { LoginOAuth2Service } from 'app/shared/oauth2/login-oauth2.service';
import { Logout } from 'app/login/logout.model';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version: string = VERSION ? 'v' + VERSION : '';
  unsubscribe$ = new Subject();
  subscription?: Subscription;

  constructor(
    private accountService: AccountService,
    private eventManager: EventManager,
    private loginService: LoginService,
    private loginOAuth2Service: LoginOAuth2Service,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfileInfo();
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess(): void {
    this.subscription = this.eventManager.subscribe('authenticationSuccess', () => this.getProfileInfo());
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.profileService
      .getProfileInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(profileInfo => {
        if (profileInfo.activeProfiles!.includes('oauth2')) {
          this.loginOAuth2Service.logout().subscribe((logout: Logout) => {
            let logoutUrl = logout.logoutUrl;
            // if Keycloak, uri has protocol/openid-connect/token
            if (logoutUrl.indexOf('/protocol') > -1) {
              logoutUrl = `${logoutUrl}?redirect_uri=${window.location.origin}`;
            } else {
              // Okta
              logoutUrl = `${logoutUrl}?id_token_hint=${logout.idToken}&post_logout_redirect_uri=${window.location.origin}`;
            }
            window.location.href = logoutUrl;
          });
        } else {
          this.loginService.logout();
          this.router.navigate(['']);
        }
      });
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getProfileInfo(): void {
    this.profileService
      .getProfileInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(profileInfo => {
        this.inProduction = profileInfo.inProduction;
        this.openAPIEnabled = profileInfo.openAPIEnabled;
      });
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subscription!.unsubscribe();
  }
}
