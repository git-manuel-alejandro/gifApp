import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '34zn8a8zhmGAKXWSxAyVuFPA4mp7r4FA'
  private servicioUrl = 'https://api.giphy.com/v1/gifs'
  private _historial : string[] = []
  public resultados : Gif[] = []

  get historial(){    
    return [...this._historial]
  }


  constructor (private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!)
    }

  }

  buscarGifts(query:string = ''){
    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes( query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,5)
      console.log(this._historial)
      localStorage.setItem('historial', JSON.stringify(this._historial) )   
    }
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe(res =>{        
        this.resultados = res.data
        console.log(this.resultados)
        localStorage.setItem('resultados', JSON.stringify(this.resultados) )
        
    })
  }
}
