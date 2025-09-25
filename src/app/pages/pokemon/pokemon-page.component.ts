import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import PokemonListComponent from '../../pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { SimplePokemon } from '../../pokemon/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {
  private _pokemonService = inject(PokemonService);
  public pokemon = signal<SimplePokemon[]>([]);

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _title = inject(Title);

  public currentPage = toSignal<number>(
    this._route.params.pipe(
      map((params) => params['page'] ?? '1'), // Esto podría solucionarse también mediante Guards. Si devuelve un null, que devuelva 1
      map((page) => (isNaN(+page) ? 1 : +page)), //Si no es un número devuelve 1 caso contrario, devuelve el valor numérico
      map((page) => Math.max(1, page)) // Si por ejemplo page vale -30, devolvería 1
    )
  );

  public loadOnPageChangedEffect = effect(() => {
    this.loadPokemon(this.currentPage());
  });

  public loadPokemon(page: number = 0) {
    // const pageToLoad = this.currentPage()! + page;

    this._pokemonService
      .loadPage(page)
      .pipe(tap(() => this._title.setTitle(`Pokemon SSR - Page ${page}`)))
      .subscribe((pokemon) => this.pokemon.set(pokemon));
  }
}
