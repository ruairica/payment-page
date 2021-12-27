import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent { 
  loadScript() {
    let node = document.createElement('script'); // creates the script tag
    node.src = 'https://js.stripe.com/v3/'; // sets the source (insert url in between quotes)
    document.getElementsByTagName('head')[0].appendChild(node);
 }

 ngOnInit() {
    this.loadScript();
 }

}
