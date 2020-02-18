import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
export interface IPost {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(private http: HttpClient) {}
  getPosts() {
    this.http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnInit() {}
}
