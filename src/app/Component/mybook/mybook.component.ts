import { IBook } from "src/app/Model/mybook.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MybookService } from "src/app/Service/mybook.service";
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, Subject, BehaviorSubject } from "rxjs";
@Component({
  selector: "app-mybook",
  templateUrl: "./mybook.component.html",
  styleUrls: ["./mybook.component.scss"]
})
export class MybookComponent implements OnInit {
  logedUser = JSON.parse(localStorage.getItem("logeduser"));
  genre = "all";
  checkRoute = 2;
  private temp: { [index: number]: IBook } = {};
  private testBook: IBook = {};
  private book: IBook[] = [];
  constructor(
    private bookService: MybookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBooks();
  }
  allbook() {
    this.genre = "all";
    this.getBooks();
  }
  scifi() {
    this.genre = "Sci-fi";
    this.getBooks();
  }
  thriller() {
    this.genre = "Thriller";
    this.getBooks();
  }
  literature() {
    this.genre = "Literature";
    this.getBooks();
  }
  classic() {
    this.genre = "Classic";
    this.getBooks();
  }
  novel() {
    this.genre = "Novel";
    this.getBooks();
  }
  getBooks() {
    this.book = [];
    this.bookService.getBooks().subscribe(value => (this.temp = value));
    if (this.genre == "all") {
      for (let item in this.temp) {
        if (this.temp[item].userId == this.logedUser.username) {
          this.book.push(this.temp[item]);
        }
      }
    } else {
      for (let item in this.temp) {
        if (
          this.temp[item].genre == this.genre &&
          this.temp[item].userId == this.logedUser.username
        )
          this.book.push(this.temp[item]);
      }
    }

    console.log("All books==", this.book);
  }

  editBook(id: string) {
    this.router.navigate([`edit-book/${id}`]);
  }
  async deleteBook(id: string) {
    await this.bookService.deleteBook(id);
    this.getBooks();
    //this.getBooks.subscribe();
  }
  addbook() {
    this.router.navigate(["add-book"]);
  }
}
