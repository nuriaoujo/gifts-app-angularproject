import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";


// El provideIn: 'root' sirve para proveer el servicio para poder alcanzar todos los componentes sin tener que importar/exportar
@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'Syt5UGQm0OKuhXBDm7eK0ccfGN4VIcjA';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
        console.log('Gifs Service Ready');
    }

    //! Para evitar irrumpir esa referencia de JS
    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void {
        if (!localStorage.getItem('history')) return;

        //? La exclamación es para asegurarle a visual que NO es nulo
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

        if (this._tagsHistory.length === 0) return;
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag(tag: string): void {
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', tag)

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe(resp => {

                this.gifList = resp.data;
                // console.log({ gifs: this.gifList });
            })

        //! Se realiza con private httpClient
        // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Syt5UGQm0OKuhXBDm7eK0ccfGN4VIcjA&q=valorant&limit=10');
        // const data = await resp.json();

        // console.log(data);
    }

    private organizeHistory(tag: string): void {
        tag = tag.toLowerCase();

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0, 10);
        this.saveLocalStorage();
    }

}