import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


// El provideIn: 'root' sirve para proveer el servicio para poder alcanzar todos los componentes sin tener que importar/exportar
@Injectable({ providedIn: 'root' })
export class GifsService {

    private _tagsHistory: string[] = [];
    private apiKey: string = 'Syt5UGQm0OKuhXBDm7eK0ccfGN4VIcjA';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) { }

    //! Para evitar irrumpir esa referencia de JS
    get tagsHistory() {
        return [...this._tagsHistory];
    }

    searchTag(tag: string): void {
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', tag)

        this.http.get(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => {
                console.log(resp);
            })

        //! Se realiza con private httpClient
        // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Syt5UGQm0OKuhXBDm7eK0ccfGN4VIcjA&q=valorant&limit=10');
        // const data = await resp.json();

        // console.log(data);
    }

    private organizeHistory(tag: string): void {
        tag = tag.toLowerCase();

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);
    }

}