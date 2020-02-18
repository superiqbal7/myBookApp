import { MybookComponent } from "./Component/mybook/mybook.component";
import { RegisterComponent } from "../app/Component/register/register.component";
import { LoginComponent } from "./Component/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./Component/home/home.component";
import { AddBookComponent } from "./Component/add-book/add-book.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "add-book",
    component: AddBookComponent
  },
  {
    path: "edit-book/:id",
    component: AddBookComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "mybook",
    component: MybookComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
