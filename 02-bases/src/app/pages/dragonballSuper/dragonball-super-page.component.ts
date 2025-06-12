import { Component, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { DragonballCharacterAddComponent } from "../../components/dragonball/character-add/dragonball-character-add.component";
import { DragonballService } from '../../services/dragonball.services'; // Importa el servicio DragonballService

@Component({
  selector: 'app-dragonball-super',
  imports: [CharacterListComponent, DragonballCharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
})
export class DragonballSuperPageComponent {

  public dragonballService = inject(DragonballService); // Inyecta el servicio DragonballService para acceder a los personajes


}
