import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { AuthService } from "./../../services/auth.service";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;

  constructor(public auth: AuthService) {}
}
