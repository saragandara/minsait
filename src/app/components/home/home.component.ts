import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';

import {PaisesService} from '../../services/paises.service';

import {CarteleraResponse, Pelicula} from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public paises:any[] = [];
  public pais:string = "";
  public nombrepais:string ="";
  public haypais:boolean = false;

  public paisant:string = "";

  public peliculas: Pelicula[] = [];
  public cargada: boolean=false;

  constructor( 
    private paisesService: PaisesService,
    private peliculasService: PeliculasService
  ) {
    //console.log("Constructor home");
    this.pais = paisesService.getPais();
    if(this.pais!="") this.cargaCartelera();
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    //No se puede cambiar el pais
    if(this.haypais==false) {
      this.pais = this.paisesService.getPais();
      if(this.pais==null) this.pais="";
      if(this.pais!="") {
        this.nombrepais = this.paisesService.getNombrePais();
        if(this.nombrepais==null) this.nombrepais="";
        if(this.nombrepais!="") {
          this.haypais=true;
          this.cargaCartelera();
        }
      }
    }
  }

  cargaCartelera(){
    //console.log("Home cargaCartelera...");
    this.peliculasService.getCartelera(this.pais)
      .subscribe(resp => {
        //console.log(resp.results);
        this.peliculas = resp.results;
      })
  }

}
