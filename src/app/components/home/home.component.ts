import { Component, OnInit } from '@angular/core';

import {PaisesService} from '../../services/paises.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paises:any[] = [];

  constructor( private paisesService: PaisesService) {
    console.log("Constructor home");

    /*this.paisesService.getListadoPaises();
    console.log("");
    this._paises.getListadoLigas();*/
  }

  ngOnInit(): void {
    
    this.paisesService.getPaises().subscribe( (paises:any) => {
      //console.log(paises);
      this.paises = paises;
    });
  }

}
