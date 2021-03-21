import { Component, OnInit, Input } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PeliculasService } from 'src/app/services/peliculas.service';

import {Pelicula, DatosPelicula, Cast} from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-poster-grid',
  templateUrl: './poster-grid.component.html',
  styleUrls: ['./poster-grid.component.css']
})
export class PosterGridComponent implements OnInit {

  @Input() peliculas: Pelicula[];
  public actores: Cast[];
  public id:number;
  public titulo:string;
  public resumen:string;

  public closeResult:string;

  public nombre = new FormControl();
  forma!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private peliculasService: PeliculasService
  ) {   
    this.id=0;
  }

  ngOnInit(): void {
    //console.log(this.peliculas);
  }

  verActores(pelicula){
    this.id = pelicula.id;
    this.titulo = pelicula.title;
    this.resumen = pelicula.overview;
    console.log("Resumen: "+pelicula.overview);
    this.peliculasService.getActores(this.id)
      .subscribe(resp => {
        //this.detalle = resp;
        this.actores = resp.cast;
      });
  }

  cerrarDetalle(){
    this.id=0;
    this.titulo="";
  }

  eliminar(idactor){
    //console.log("Eliminar actor "+idactor);
    this.actores.splice(idactor, 1); 
  }

  anadir(nombre){
    let actor = {} as Cast;
    actor.name = nombre;
    actor.original_name = nombre;
    this.actores.push(actor);

    let element: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
    element.click();
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Cerrado por... "+this.closeResult);      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Cerrado por... "+this.closeResult);     
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
