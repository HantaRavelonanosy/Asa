import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "../components/components.module";

import { LoginFormComponent } from "./login-form/login-form.component";
import { LoginPageComponent } from "./login-page/login-page.component";

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent,
  },
];

@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginModule {}
