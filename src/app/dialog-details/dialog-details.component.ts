import { IBook } from "./../Model/mybook.model";
import { HomeComponent } from "./../Component/home/home.component";
import { Component, OnInit, Inject } from "@angular/core";
import { MybookService } from "../Service/mybook.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
@Component({
  selector: "app-dialog-details",
  templateUrl: "./dialog-details.component.html",
  styleUrls: ["./dialog-details.component.scss"]
})
export class DialogDetailsComponent implements OnInit {
  mybook: IBook;

  constructor(
    private bookService: MybookService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}
