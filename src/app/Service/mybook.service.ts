import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { IBook } from "src/app/Model/mybook.model";
import { HttpClient } from "@angular/common/http";
import { IUser, credential } from "../Model/mybook.model";

import { tap, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

export interface IPost {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

@Injectable({
  providedIn: "root"
})
export class MybookService {
  private localStorageBooks: { [index: string]: IBook } = {};
  private localStorageUsers: { [index: string]: IUser } = {};
  private testBook: IBook = {};
  private books: IBook[] = [];
  myTitle: string;
  logedUser: IUser | {} = {};

  private authState = new BehaviorSubject("false"); //authentication state
  currentState = this.authState.asObservable();

  constructor(private http: HttpClient) {
    this.init();
  }
  async init() {
    this.getPosts();
    //console.log(this.logedUser);
    if (this.getLocalStorage("books")) {
      this.localStorageBooks = (await this.getLocalStorage("books")) as {
        [index: string]: IBook;
      };
    } else {
      localStorage.setItem("books", JSON.stringify(this.localStorageBooks));
    }

    //--
    if (this.getLocalStorage("users")) {
      this.localStorageUsers = (await this.getLocalStorage("users")) as {
        [index: string]: IUser;
      };
    } else {
      localStorage.setItem("users", JSON.stringify(this.localStorageUsers));
    }
    //-- check if there are loged user
    if (this.getLocalStorage("logeduser")) {
      this.logedUser = (await this.getLocalStorage("users")) as IUser;
    } else {
      localStorage.setItem("logeduser", JSON.stringify(this.logedUser));
    }
  }
  //change loged user state
  changeState(state) {
    this.authState.next(state);
  }
  //get loged user form localstorage
  getLogedUser() {
    if (JSON.parse(localStorage.getItem("logeduser")) != null) {
      this.changeState(true);
      return true;
    } else {
      this.changeState(false);
      return false;
    }
  }
  async isAuthorized(): Promise<boolean | string> {
    if (Object.keys(this.logedUser).length !== 0) {
      return true;
    } else {
      throw "incorrect userid/password";
    }
  }
  updateLocalStorage(
    key: string,
    data: { [index: string]: IBook } | { [index: string]: IUser }
  ) {
    return Promise.resolve().then(function() {
      localStorage.setItem(key, JSON.stringify(data));
    });
  }
  getLocalStorage(key: string): Promise<string | {}> {
    return Promise.resolve().then(function() {
      return JSON.parse(localStorage.getItem(key)) || {};
    });
  }
  async addBook(bookdata: IBook): Promise<void> {
    this.localStorageBooks[bookdata.id] = bookdata;
    await this.updateLocalStorage("books", this.localStorageBooks);
  }
  getBooks(): Observable<{ [index: number]: IBook }> {
    return new Observable<{ [index: number]: IBook }>(observer => {
      observer.next(JSON.parse(localStorage.getItem("books")));
      //return JSON.parse(localStorage.getItem("books"));
    });
  }
  async updateBook(bookdata: IBook): Promise<void> {
    this.localStorageBooks[bookdata.id].title = bookdata.title;
    this.localStorageBooks[bookdata.id].author = bookdata.author;
    this.localStorageBooks[bookdata.id].rating = bookdata.rating;
    this.localStorageBooks[bookdata.id].isbn = bookdata.isbn;
    this.localStorageBooks[bookdata.id].seller = bookdata.seller;
    await this.updateLocalStorage("books", this.localStorageBooks);
  }
  async deleteBook(id: string): Promise<void> {
    delete this.localStorageBooks[id];
    await this.updateLocalStorage("books", this.localStorageBooks);
  }

  getBookById(id: number): IBook {
    return this.localStorageBooks[id];
  }
  async addUser(userdata: IUser): Promise<void> {
    this.localStorageUsers[userdata.userId] = userdata;
    await this.updateLocalStorage("users", this.localStorageUsers);
  }
  async login(userdata: credential) {
    for (let user in this.localStorageUsers) {
      if (
        this.localStorageUsers[user].username === userdata.username &&
        this.localStorageUsers[user].password === userdata.password
      ) {
        console.log("testing...." + this.localStorageUsers[user].username);
        this.logedUser = this.localStorageUsers[user];
        console.log(this.logedUser);
        localStorage.setItem("logeduser", JSON.stringify(this.logedUser));
        //this.updateLocalStorage[user];
        return this.logedUser;
      }
    }
    throw "No user found";
  }

  logout() {
    this.logedUser = null;
    localStorage.setItem("logeduser", JSON.stringify(this.logedUser));
  }
  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")
      .pipe(
        tap(
          resp => {
            resp.forEach(post => {
              if (post.id === 10) {
                this.myTitle = post.title;
              }
            });
          },
          err => {}
        ),
        map(resp => {
          const abc: any[] = [];
          resp.forEach(post => {
            const myObj = {
              userId: post.userId,
              id: post.id,
              title: post.title,
              body: post.body,
              h: "Zahid"
            };
            abc.push(myObj);
          });

          return abc;
        })
      );
  }

  addPost() {
    const post: IPost = {
      id: 1,
      userId: 4
    };
    this.http
      .post<IPost>("https://jsonplaceholder.typicode.com/posts", post)
      .subscribe(resp => {
        console.log("TCL: addPost -> resp", resp);
      });
  }
}
