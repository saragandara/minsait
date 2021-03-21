import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';

import {PaisesService} from '../../services/paises.service';

import {Pelicula} from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public pais:string = "";
  public nombrepais:string = "";

  public peliculas: Pelicula[] = [];

  constructor( 
    private paisesService: PaisesService,
    private peliculasService: PeliculasService
  ) {

    console.log("Constructor Eventos");
  }

  ngOnInit(): void {
    this.pais = this.paisesService.getPais();
    if(this.pais==null) this.pais="";
    if(this.pais!="") {
      this.nombrepais = this.paisesService.getNombrePais();
      if(this.nombrepais==null) this.nombrepais="";
      this.cargaEstrenos();
    }
  }

  ngAfterViewChecked() {
  }

  cargaEstrenos(){
    console.log("Eventos cargaEstrenos...");
    this.peliculasService.getEstrenos(this.pais)
      .subscribe(resp => {
        console.log(resp.results);
        this.peliculas = resp.results;
      })
  }

}
