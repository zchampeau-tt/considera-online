import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MusiqueService} from "../../../services/app/musique/musique.service";
import {MuhLoginDialogComponent} from "../../_dialogs/muh-login-dialog/muh-login-dialog.component";
import {Genre} from "../../../models/app/musique/genre.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-musique-add',
  templateUrl: './musique-add.component.html',
  styleUrls: ['./musique-add.component.scss']
})
export class MusiqueAddComponent {
  private _genreCache: Genre[] = [];

  public constructor(private _snack: MatSnackBar,
                     private _musicService: MusiqueService) {
    this.loadGenres();
  }

  public get genreOptions(): string[] {
    return this._genreCache.map((genre: Genre) => genre.name);
  }

  public loadGenres(): void {
    this._musicService.getGenres().subscribe((genres: Genre[]) => {
      this._genreCache = genres;
    });
  }

  protected readonly MuhLoginDialogComponent = MuhLoginDialogComponent;
}
