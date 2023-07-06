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
  startIndex: number = 1;
  loading: boolean = true; // Agrega la propiedad loading

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.showJokes();
  }

  getChuckNorrisJokes() {
    const searchTerm = 'Chuck Norris';
    const url = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchTerm)}`;

    this.http.get<any>(url)
      .subscribe(response => {
        const jokes: ChuckNorrisJoke[] = response.result;
        this.jokes = jokes.map(joke => joke.value);
        console.log(this.jokes);
        this.loading = false; // Desactivar la pantalla de carga cuando se completan los datos
      });
  }

  showJokes() {
    this.getChuckNorrisJokes();
  
    setTimeout(() => {
      const startIndex = 1;
      const endIndex = startIndex + 100;
  
      if (this.jokes.length >= endIndex) {
        this.jokes = this.jokes.slice(startIndex - 1, endIndex - 1);
      } else {
        this.jokes = this.jokes.slice(startIndex - 1, this.jokes.length);
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


