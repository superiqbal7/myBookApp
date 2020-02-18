import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MybookService } from "src/app/Service/mybook.service";

@Component({
  selector: "app-genre",
  templateUrl: "./genre.component.html",
  styleUrls: ["./genre.component.scss"]
})
export class GenreComponent implements OnInit {
  @Output() bookgenre = new EventEmitter<number>();
  constructor(private bookservice: MybookService) {}

  ngOnInit() {}
  showBookByGenre(genre: number) {
    console.log("genre fired on genre component", genre);
    this.bookgenre.emit(genre);
  }
}
