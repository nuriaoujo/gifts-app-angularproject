import { Injectable } from "@angular/core";


// El provideIn: 'root' sirve para proveer el servicio para poder alcanzar todos los componentes sin tener que importar/exportar
@Injectable({providedIn: 'root'})
export class GifsService {
    
    private _tagsHistory: string[] = [];

    constructor() {}

    //! Para evitar irrumpir esa referencia de JS
    get tagsHistory() {
        return [...this._tagsHistory];
    }

    public searchTag(tag: string): void {
        this._tagsHistory.unshift(tag);

        console.log(this.tagsHistory);
    }

}