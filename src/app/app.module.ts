import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { NavbarComponent } from "./navbar/navbar.component";
import { ListingComponent } from "./listing/listing.component";
import { CreateComponent } from "./create/create.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { ViewComponent } from "./view/view.component";
import { routes } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PreviewComponent } from "./preview/preview.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth-guard.guard";
import { CommentSectionComponent } from "./comment-section/comment-section.component";
import { CarousalComponent } from "./carousal/carousal.component";

@NgModule({
    declarations: [AppComponent, NavbarComponent, HomeComponent, ListingComponent, CreateComponent, AuthenticationComponent, ViewComponent,ProfileComponent, PreviewComponent, CommentSectionComponent, ListingComponent, CarousalComponent],
    imports: [RouterOutlet, BrowserModule, HttpClientModule, RouterModule.forRoot(routes), RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule, FormsModule],
    exports: [RouterModule,RouterLink, RouterOutlet],
    bootstrap: [AppComponent],
    providers: [AuthGuard]
})

export class AppModule {}
