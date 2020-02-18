import { Component, OnInit } from "@angular/core";
import { IBook } from "src/app/Model/mybook.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MybookService } from "src/app/Service/mybook.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"]
})
export class AddBookComponent implements OnInit {
  isEditable: boolean = false;
  bookForm: FormGroup;
  book: IBook | any = {};
  bookId: number;
  color: string = "blue";
  logedUser = JSON.parse(localStorage.getItem("logeduser"));
  constructor(
    private bookService: MybookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    console.log(this.bookService.getBooks());
    this.activatedRoute.paramMap.subscribe(resp => {
      if (resp.get("id")) {
        this.bookId = parseInt(resp.get("id"));
        this.book = this.bookService.getBookById(this.bookId);
        console.log("test book", this.book);

        this.isEditable = true;
      }
    });
    this.initBookForm();
  }
  myControl = new FormControl();
  options: string[] = ["Sci-fi", "Classic", "Thriller", "Novel", "Literature"];

  initBookForm() {
    this.bookForm = this.formBuilder.group({
      title: [this.book.title, Validators.required],
      author: [
        this.book.author,
        [Validators.required, Validators.maxLength(80), Validators.minLength(3)]
      ],
      seller: [
        this.book.seller,
        [Validators.required, Validators.maxLength(80), Validators.minLength(3)]
      ],
      isbn: [
        this.book.isbn,
        [Validators.required, Validators.maxLength(60), Validators.minLength(3)]
      ],
      rating: [
        this.book.rating,
        [Validators.required, Validators.max(10), Validators.min(1)]
      ],
      imgurl: [
        this.book.imgurl,
        [
          Validators.required,
          Validators.pattern(
            "https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}"
          )
        ]
      ],
      genre: [this.book.genre]
    });
  }

  addBook() {
    console.log(
      "TCL: AddBookComponent -> addBook -> this.bookForm.value",
      this.bookForm.value
    );

    if (this.bookForm.valid) {
      this.book = this.bookForm.value;
      let x: number;
      let y: { [index: number]: IBook };
      this.bookService
        .getBooks()
        .subscribe(value => (y = value))
        .unsubscribe();
      console.log(y);
      if (y != null) {
        x = Object.keys(y).length;
        console.log(x);
        this.book.id = x + 1;
      } else this.book.id = 1;
      console.log(x);
      //this.book.id = x ? x + 1 : 1;
      this.book.userId = this.logedUser.username;
      this.bookService.addBook(this.book);
      this.book = {};
      this.router.navigate(["mybook"]);
    }
  }
  editBook() {
    this.book.id = this.bookId;
    this.bookService.updateBook(this.book);
    this.book = {};
    this.router.navigate(["home"]);
  }
}
