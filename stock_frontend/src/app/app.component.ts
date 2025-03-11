import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import EntryListComponent from "./features/entry/components/entries-list.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EntryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock_frontend';
}
