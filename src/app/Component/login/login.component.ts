import { Validators } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { IUser } from "../../Model/mybook.model";
import { MybookService } from "src/app/Service/mybook.service";
import { state } from "@angular/animations";
import { stringify } from "querystring";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  state: string | boolean;
  loginForm: FormGroup;
  private loginData: IUser;
  constructor(
    private bookService: MybookService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initLoginForm();
    this.bookService.currentState.subscribe(state => (this.state = state));
  }
  initLoginForm() {
    this.loginForm = this.FormBuilder.group({
      username: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(3)
          // Validators.pattern(
          //   "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}"
          // )
        ]
      ]
    });
  }
  async userLogin() {
    try {
      console.log(this.loginForm.value);
      await this.bookService.login(this.loginForm.value);
      //this.bookService.logedUser = this.loginData;
      let temp = await this.bookService.isAuthorized();
      if (temp) {
        this.bookService.changeState(true);
        this.router.navigate(["home"]);
      }
      console.log(this.bookService.logedUser);
    } catch (error) {
      console.log(error);
    }
  }
}
