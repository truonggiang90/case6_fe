import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  handleMessage(arg0: string) {
      throw new Error('Method not implemented.');
  }
  title = 'case5';
}
