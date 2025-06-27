import { ChangeDetectionStrategy, Component } from '@angular/core';
import PokemonListComponent from '../../pokemon/components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'pokemon-page',
  imports: [PokemonListComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {}
