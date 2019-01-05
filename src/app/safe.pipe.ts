import { Pipe, PipeTransform } from "@angular/core";
import { normalizeURL, Platform } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "safe"
})
export class SafePipe implements PipeTransform {
  constructor(private platform: Platform, private domSanitizer: DomSanitizer) {}

  transform(url) {
    let result;
    if (this.platform.is("android")) {
      result = this.domSanitizer.bypassSecurityTrustUrl(url);
    } else {
      result = normalizeURL(url);
    }

    return result;
  }
}
