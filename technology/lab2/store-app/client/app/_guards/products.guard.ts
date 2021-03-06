/**
 * Created by Drapegnik on 5/29/17.
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_sevices/authentication.service';
import User from '../_models/user';

@Injectable()
export class ProductsGuard implements CanActivate {
  user: User;

  public static check(user: User) {
    return user.role === 'admin' || user.role === 'catalog-manager' || user.role === 'product-manager';
  }

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    authenticationService.currentUser().subscribe(user => this.user = user);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {

    if (ProductsGuard.check(this.user)) {
      return true;
    }

    this.router.navigate(['orders']);
    return false;
  }
}
