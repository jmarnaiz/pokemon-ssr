import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import PokemonListComponent from '../../pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { SimplePokemon } from '../../pokemon/interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-page',
  imports: [PokemonListComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private _pokemonService = inject(PokemonService);
  public pokemon = signal<SimplePokemon[]>([]);
  // public isLoading = signal(true);
  ngOnInit(): void {
    this.loadPokemon();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemon(page: number = 0) {
    this._pokemonService
      .loadPage(page)
      // .subscribe((pokemon) => this.pokemon.set(pokemon));
      .subscribe(this.pokemon.set);
  }
}
