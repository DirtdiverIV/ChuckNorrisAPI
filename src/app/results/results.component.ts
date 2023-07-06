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

  startIndex: number = 0;

  showJokes() {
    this.getChuckNorrisJokes();
  
    setTimeout(() => {
      const startIndex = 100;
      const endIndex = 200;
  
      if (this.jokes.length >= endIndex) {
        this.jokes = this.jokes.slice(startIndex, endIndex);
      } else {
        this.jokes = [];
      }
    }, 1000);
  }
  
  modifyJoke(index: number) {
    const modifiedJoke = prompt('Ingrese el nuevo valor para el chiste:');
    if (modifiedJoke) {
      if (modifiedJoke.includes('Chuck Norris')) {
        this.jokes.splice(index, 1, modifiedJoke);
      } else {
        alert('El nombre de Chuck Norris debe estar presente en el chiste.');
      }
    }
  }
  
  
  deleteJoke(index: number) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este chiste?');
    if (confirmation) {
      this.jokes.splice(index, 1);
    }
  }

  createJoke() {
    const newJoke = prompt('Ingrese el nuevo chiste:');
    if (newJoke) {
      if (newJoke.includes('Chuck Norris')) {
        this.jokes.unshift(newJoke);
      } else {
        alert('El nombre de Chuck Norris debe estar presente en el chiste.');
      }
    }
  }
  
  
  
}

