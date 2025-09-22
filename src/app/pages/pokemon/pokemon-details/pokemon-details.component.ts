import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../../pokemon/interfaces';
import { PokemonService } from '../../../pokemon/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-details',
  imports: [],
  templateUrl: './pokemon-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonDetailsComponent implements OnInit {
  public pokemon = signal<Pokemon | null>(null);
  private _pokemonService = inject(PokemonService);
  private _route = inject(ActivatedRoute);
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id') ?? '';
    this._pokemonService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Pokemon Page ${name}`;

          this._title.setTitle(pageTitle);

          this._meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this._meta.updateTag({ name: 'og:title', content: pageTitle }),
            this._meta.updateTag({
              name: 'og:description',
              content: pageDescription,
            });
          this._meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
