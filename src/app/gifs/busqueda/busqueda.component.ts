import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>

  constructor( private GifsService:GifsService){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value

    if(valor.trim().length === 0){
      alert('Búsqueda vacía')
      return
    }
    
    this.GifsService.buscarGifts(valor)

    this.txtBuscar.nativeElement.value = ''
  }
  

}
