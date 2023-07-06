import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChuckNorrisJoke {
  value: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  jokes: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getChuckNorrisJokes();
  }

  getChuckNorrisJokes() {
    const searchTerm = 'Chuck Norris'; // Término de búsqueda
    const url = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchTerm)}`;
  
    this.http.get<any>(url)
      .subscribe(response => {
        const jokes: ChuckNorrisJoke[] = response.result;
        this.jokes = jokes.map(joke => joke.value);
        console.log(this.jokes);
      });
  }

  showJokes() {
    this.jokes = [...this.jokes];
  }
}

