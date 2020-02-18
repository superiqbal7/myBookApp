import { IBook } from "src/app/Model/mybook.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.scss"]
})
export class BookCardComponent implements OnInit {
  @Input("books") books: IBook[];
  @Input("checkRoute") checkRoute: number;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() details = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
    console.log("TCL: BookCardComponent -> ngOnInit -> this.books", this.books);
    console.log("route $$$" + this.checkRoute);
  }

  editBook(id: number) {
    this.edit.emit(id);
  }
  deleteBook(id: number) {
    this.delete.emit(id);
  }
  dialogOpen(id: number) {
    this.details.emit(id);
  }
}
