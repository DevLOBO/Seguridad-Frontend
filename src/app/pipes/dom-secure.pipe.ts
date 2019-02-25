import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSecure'
})
export class DomSecurePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) { }

  transform(img: string): string {
    const url: string = this.domSanitizer.bypassSecurityTrustUrl(`data: image/png; base64, ${img}`);
    return url;
  }
}
