import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginGQL } from "src/app/graphql/services";

@Component({
  selector: "drs-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  public username = "";
  public password = "";
  public error = false;

  constructor(public loginGQL: LoginGQL, private router: Router) {}

  login() {
    this.loginGQL
      .mutate({ username: this.username, password: this.password })
      .subscribe(
        () => {
          void this.router.navigate(["/"]);
        },
        () => {
          this.error = true;
        }
      );
  }
}
