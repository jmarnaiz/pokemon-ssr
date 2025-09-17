import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import PokemonListComponent from '../../pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { SimplePokemon } from '../../pokemon/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private _pokemonService = inject(PokemonService);
  public pokemon = signal<SimplePokemon[]>([]);

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _title = inject(Title);

  public currentPage = toSignal<number>(
    this._route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'), // Si devuelve un null, que devuelva 1
      map((page) => (isNaN(+page) ? 1 : +page)), //Si no es un número devuelve 1 caso contrario, devuelve el valor numérico
      map((page) => Math.max(1, page)) // Si por ejemplo page vale -30, devolvería 1
    )
  );
  // public isLoading = signal(true);
  ngOnInit(): void {
    this.loadPokemon();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemon(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;

    console.log({ pageToLoad });

    // No podemos utilizar update o set porque es un ReadOnly Signal
    // this.currentPage.update()

    this._pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this._router.navigate([], { queryParams: { page: pageToLoad || 1 } })
        ),
        tap(() => this._title.setTitle(`Pokemon SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemon) => this.pokemon.set(pokemon));
    // .subscribe(this.pokemon.set);
  }
}
