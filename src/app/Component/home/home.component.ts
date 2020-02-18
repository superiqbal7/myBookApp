import { DialogDetailsComponent } from "./../../dialog-details/dialog-details.component";
import { IBook } from "src/app/Model/mybook.model";
import { Router } from "@angular/router";
import { MybookService } from "src/app/Service/mybook.service";
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, Subject, BehaviorSubject } from "rxjs";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  currentBook: any;
  text: string = "All";
  genreNum: number = 0;
  bookGenre: string[] = [
    "Sci-fi",
    "Classic",
    "Thriller",
    "Novel",
    "Literature"
  ];
  checkRoute = 1;
  mySubject: Subject<boolean> = new Subject();
  myBeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  my$: Observable<boolean>;
  myB$: Observable<boolean>;
  api: Promise<string>;
  obApi: Observable<string[]>;
  private temp: { [index: number]: IBook } = {};
  private testBook: IBook = {};
  private book: IBook[] = [];
  constructor(
    private bookService: MybookService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    //this.my$ = this.mySubject.asObservable();
    //this.myB$ = this.myBeSubject.asObservable();

    // setTimeout(() => {
    //   this.mySubject.next(true);
    //   this.myBeSubject.next(true);
    // }, 5000);

    // this.my$.subscribe(resp => {
    //   console.log(
    //     "TCL: HomeComponent -> ngOnInit -> resp **************",
    //     resp
    //   );
    // });
    // this.myB$.subscribe(resp => {
    //   console.log(
    //     "TCL: HomeComponent -> ngOnInit -> resp ###############",
    //     resp
    //   );
    // });

    this.setBooks();
    // this.bookService.getPosts().subscribe(resp => {
    //   console.log("TCL: HomeComponent -> ngOnInit -> resp", resp);
    //   this.bookService.myTitle;
    //   console.log(
    //     "TCL: HomeComponent -> ngOnInit -> this.bookService.myTitle ----> ",
    //     this.bookService.myTitle
    //   );
    // });
    // setTimeout(() => {
    //   console.log("Add Post");

    //   this.bookService.addPost();
    // }, 3000);
  }
  openDialog(id: any): void {
    this.getBook(id);
    console.log(this.currentBook);
    this.dialog.open(DialogDetailsComponent, {
      data: {
        title: this.currentBook.title,
        author: this.currentBook.author,
        image: this.currentBook.imgurl,
        seller: this.currentBook.seller,
        isbn: this.currentBook.isbn,
        genre: this.currentBook.genre,
        rating: this.currentBook.rating
      }
    });
  }
  showBookByGenre(genre: number) {
    this.genreNum = genre;
    console.log("genre fired on home component");
    this.text = this.bookGenre[this.genreNum - 1];
    this.setBooks();
  }
  getBook(id?: any) {
    this.bookService.getBooks().subscribe(value => (this.temp = value));
    this.currentBook = this.temp[id];
  }
  setBooks(id?: number) {
    this.book = [];
    this.getBook();
    for (let item in this.temp) {
      if (
        this.genreNum != 0 &&
        this.bookGenre[this.genreNum - 1] == this.temp[item].genre
      ) {
        this.book.push(this.temp[item]);
      } else if (this.genreNum == 0) {
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
    this.setBooks();
    //this.getBooks.subscribe();
  }
}

/*
    ngOnInit() {
    // const mySub:Subject<string> = new Subject<string>();

    // mySub.next('aaaaa');

    // const bSub:BehaviorSubject<string> = new BehaviorSubject<string>('aaaaaaa');

    // this.obApi = new Observable(resp=>{

    //   let i = 0;

    //   setInterval(()=>{
    //     i++;
    //     resp.next(['1','2','3']);
    //   },3000)
    // });

    //  this.api = new Promise<string>((succ, reject)=>{
    //   setTimeout(() => {
    //     // succ('Yahoo');
    //     reject(':(')
    //   }, 3000);
    // });
    // console.log("promise start");

    //this.getBooks();
    this.getBooks.subscribe();
  }

  async getBooks() {
    // test--
    // const apiSubs:Subscription = this.obApi.subscribe(resp=>{
    // console.log("TCL: HomeComponent -> getBooks -> resp", resp)

    // });

    // setTimeout(() => {
    //   apiSubs.unsubscribe();
    // }, 7000);

    // try {
    //   const result = await this.api;
    // } catch (error) {
    // console.log("TCL: HomeComponent -> getBooks -> error", error);
    // }
    
    // code ---
    this.book = [];
    this.temp = this.bookService.getBooks();
    //console.log('All books==', this.books);
    for (let item in this.temp) {
      this.book.push(this.temp[item]);
    }
  }
*/
