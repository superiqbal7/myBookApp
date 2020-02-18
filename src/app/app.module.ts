import { MdComponentsModule } from "./md-components/md-components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "././Component/home/home.component";
import { AddBookComponent } from "./Component/add-book/add-book.component";
import { MybookService } from "./Service/mybook.service";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./Component/login/login.component";
import { RegisterComponent } from "./Component/register/register.component";
import { NavBarComponent } from "./Component/nav-bar/nav-bar.component";
import { BookCardComponent } from "./Component/book-card/book-card.component";
import { HighlightDirective } from "./highlight.directive";
import { DetailsPipe } from "./Pipe/details.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GenreComponent } from "./Component/genre/genre.component";
import { MybookComponent } from "./Component/mybook/mybook.component";
import { DialogDetailsComponent } from "./dialog-details/dialog-details.component";
import { PostsComponent } from "./posts/posts.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddBookComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    BookCardComponent,
    HighlightDirective,
    DetailsPipe,
    GenreComponent,
    MybookComponent,
    DialogDetailsComponent,
    PostsComponent
  ],
  entryComponents: [DialogDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdComponentsModule
  ],
  providers: [MybookService, HighlightDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
