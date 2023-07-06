import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChuckNorrisJoke {
  value: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  jokes: string[] = [];

  constructor(private http: HttpClient) { }

  getChuckNorrisJokes() {
    const searchTerm = 'Chuck Norris';
    const url = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchTerm)}`;

    this.http.get<any>(url)
      .subscribe(response => {
        const jokes: ChuckNorrisJoke[] = response.result;
        this.jokes = jokes.map(joke => joke.value);
        console.log(this.jokes);
      });
  }

  showJokes() {
    const startIndex = 100;
    const endIndex = 200;
  
    this.getChuckNorrisJokes();
    this.jokes = [];
  
    setTimeout(() => {
      if (this.jokes.length >= endIndex) {
        this.jokes = this.jokes.slice(startIndex, endIndex);
      }
    }, 1000);
  }
}

