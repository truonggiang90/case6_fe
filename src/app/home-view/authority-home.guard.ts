import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route,
  Router, RouterStateSnapshot, UrlSegment, UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../authority/service/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthorityHomeGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.canActivate(childRoute, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }


  checkLogin(url: string): boolean {
    if (this.authService.currentUserValue !== null) {
      return true;
    }

    this.router.navigateByUrl("/login")
    return false;
  }

}
