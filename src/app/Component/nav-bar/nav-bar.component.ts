import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MybookService } from "src/app/Service/mybook.service";
import { FormBuilder } from "@angular/forms";
import { IUser, credential } from "src/app/Model/mybook.model";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  logedUser: IUser;
  check: boolean | string = false;
  state: boolean | string = false;
  constructor(
    private bookService: MybookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  async ngOnInit() {
    this.check = this.bookService.getLogedUser();
    console.log("uuuu " + this.check);
    this.bookService.currentState.subscribe(state => (this.state = state));
  }
  login() {}
  logout() {
    this.bookService.logout();
    this.state = false;
    this.bookService.changeState(false);
    this.router.navigate(["home"]);
  }
}
