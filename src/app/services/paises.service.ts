import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  paises: any[] = [];
  ligas: any[] = [];

  public pais:string = "";
  public nombrepais:string = "";

  constructor(private http: HttpClient) { 
    //console.log('Servicio paises');
  }

  getPaises(){
    return this.http.get("https://restcountries.eu/rest/v2/lang/es")
    /*.subscribe((data:any) => {
      console.log(data);
      return data;
    })*/;
  }

  setPais(pais:string){
    localStorage.setItem('currentPais', pais);
  }

  getPais(){
    let resp = localStorage.getItem('currentPais');
    //console.log("Pais Service getPais... Pais: "+resp);
    if(resp==null) return resp="";
    return resp;
  }

  getNombrePais(){
    /*let resp = localStorage.getItem('nombrePais');
    console.log("Pais Service getNombrePais... Nombrepais: "+resp);
    if(resp==null || resp=="") {
      this.buscaNombrePais();
      if(resp==null) return resp="";
    }
    return resp;*/
    this.buscaNombrePais();
    return this.nombrepais;
  }

  buscaNombrePais(){
    let codigo = this.getPais();
    if(codigo!="" && codigo!=null) {
      this.http.get("https://restcountries.eu/rest/v2/alpha/"+codigo).subscribe(
        (data:any) => {
          //console.log(data);
          this.nombrepais=data.name;
          //console.log(".. name: "+data.name);
        }
      );

      //console.log("BuscaNombrePais... pais: "+codigo+", nombrepais: "+this.nombrepais);
      if(this.nombrepais==null) this.nombrepais="";
      else this.setNombrePais(this.nombrepais);
    }
  }

  setNombrePais(pais:string){
    localStorage.setItem('nombrePais', pais);
  }

  removePais() {
    //localStorage.clear();
    localStorage.removeItem("nombrePais");
    localStorage.removeItem("nombrepais");
    localStorage.removeItem("currentPais");
    let resp = localStorage.getItem('currentPais');
    console.log("Pais Service removePais... Pais: "+resp);
  }
}
