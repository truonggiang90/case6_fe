import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route,
  Router, RouterStateSnapshot, UrlSegment, UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../service/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthorityGuard implements CanActivate, CanActivateChild, CanLoad {
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

    if (this.authService.isLoggedIn ) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: {session_id: sessionId},
      fragment: 'anchor'
    };
    // @ts-ignore
    if(this.authService.currentUserValue?.roles[0].authority !== "ROLE_ADMIN"){
      // Navigate to the login page with extras
      this.router.navigate(['/login', {message: "You are not allow to access this page ",alertType:"true"}], navigationExtras);
      return false;
    }
    // Navigate to the login page with extras
    this.router.navigate(['/login', {message: "Phiên đăng nhập của bạn đã hết",alertType:"true"}], navigationExtras);
    return false;
  }

}
