import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MybookService } from "src/app/Service/mybook.service";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IUser } from "src/app/Model/mybook.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private registerData: IUser;
  constructor(
    private bookService: MybookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
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
  async addUser() {
    try {
      console.log(this.registerForm.value);
      await this.bookService.addUser(this.registerForm.value);
      this.router.navigate(["login"]);
    } catch (error) {
      console.log(error);
    }
  }
}
