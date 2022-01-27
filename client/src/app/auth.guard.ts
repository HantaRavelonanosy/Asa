import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { map, filter } from "rxjs/operators";
import { UserInfoGQL } from "./graphql/services";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userInfoGQL: UserInfoGQL) {}
  canActivate(route: ActivatedRouteSnapshot) {
    return (
      this.userInfoGQL
        // get uer info from server
        // network only because cache will prevent us to log in
        .watch({}, { fetchPolicy: "network-only" })
        // ignore when request is in loading state
        .valueChanges.pipe(filter((result) => !result.loading))
        .pipe(
          map((result) => {
            if (
              result.error ||
              result.errors ||
              !result.data.userInfo.loggedIn
            ) {
              // redirect to login page
              return this.router.createUrlTree(["login"]);
            } else {
              if (
                typeof route.data.module == "string" &&
                !(result.data.userInfo.modules as string[])?.includes(
                  route.data.module
                )
              ) {
                // not authorized
                return false; // TODO 404 page
              }
              // everything OK
              return true;
            }
          })
        )
    );
  }
}
