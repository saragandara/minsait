import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteleraResponse, DatosPelicula } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor( private http: HttpClient) { }

  getCartelera(pais):Observable<CarteleraResponse>{
    return this.http.get<CarteleraResponse>("https://api.themoviedb.org/3/movie/now_playing?api_key=2a9e98ab4c5e520f0af9969fed6205b9&language=es-ES&page=1&region="+pais);
  }

  getActores(idPelicula):Observable<DatosPelicula>{
    return this.http.get<DatosPelicula>("https://api.themoviedb.org/3/movie/"+idPelicula+"/credits?api_key=2a9e98ab4c5e520f0af9969fed6205b9&language=es-ES");
  }

  getEstrenos(pais):Observable<CarteleraResponse>{
    return this.http.get<CarteleraResponse>("https://api.themoviedb.org/3/movie/upcoming?api_key=2a9e98ab4c5e520f0af9969fed6205b9&language=es-ES&page=1&region="+pais);
  }
}
