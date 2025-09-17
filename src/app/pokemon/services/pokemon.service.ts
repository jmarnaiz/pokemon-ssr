import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokemonAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    const params = {
      params: new HttpParams().set('offset', page * 20).set('limit', 20),
    };

    return this._http
      .get<PokemonAPIResponse>('https://pokeapi.co/api/v2/pokemon', params)
      .pipe(
        map((resp) => {
          return resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
        })
      );
    //   return this._http
    //     .get<PokemonAPIResponse>('https://pokeapi.co/api/v2/pokemon', params)
    //     .pipe(
    //       map((resp) => {
    //         const simplePokemon: SimplePokemon[] = resp.results.map(
    //           (pokemon) => ({
    //             id: pokemon.url.split('/').at(-2) ?? '',
    //             name: pokemon.name,
    //           })
    //         );

    //         return simplePokemon;
    //       }),
    //       // tap((pokemon) => console.log({ pokemon }))
    //       tap(console.log)
    //     );
  }
}
