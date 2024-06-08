import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Genre} from "../../../../models/app/musique/genre.model";
import {MuhLoginDialogComponent} from "../../../_dialogs/muh-login-dialog/muh-login-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MusiqueService} from "../../../../services/app/musique/musique.service";
import {
  MuhSingleTextInputComponent
} from "../../../_templates/muh-inputs/muh-text-inputs/muh-single-text-input/muh-single-text-input.component";

@Component({
  selector: 'app-musique-modify-genre',
  templateUrl: './musique-modify-genre.component.html',
  styleUrl: './musique-modify-genre.component.scss'
})
export class MusiqueModifyGenreComponent {
  public genre : Genre = new Genre();
  public genreQuery: Genre = new Genre();
  public genreName: string = '';
  public genreDesc: string = '';
  public genresToAssign: string[] = [];
  public subgenresToAssign: string[] = [];
  @Input() genreOptions: Genre[] = [];
  @Output() public genreDataChanged: EventEmitter<void> =
    new EventEmitter<void>();
  @ViewChild('nameInput') public nameInput =
    new MuhSingleTextInputComponent();
  @ViewChild('descriptionInput') public descriptionInput =
    new MuhSingleTextInputComponent();

  public constructor(private _snack: MatSnackBar,
                     private _musicService: MusiqueService) {}

  public getGenreOptions(): string[] {
    return this.genreOptions.map(x => x.name);
  }

  public onGenreSelect(): void {
    this._musicService
      .getGenre(this.genreQuery.id)
      .subscribe(x => {
        this.genre = x;
        this.nameInput.input = x.name;
        this.descriptionInput.input = x.description;
      });
  }

  public setGenreQuery(index: number): void {
    this.genreQuery = this.genreOptions[index];
    this.onGenreSelect();
  }

  public setGenreName(value: string): void {
    this.genreName = value;
  }

  public setGenreDesc(value: string): void {
    this.genreDesc = value;
  }

  public clear(): void {
  }

  private _try(): boolean {
    if (!MuhLoginDialogComponent.loggedIn()) {
      return this._throwSnack(0);
    }
    return true;
  }

  private _throwSnack(id: number): boolean { // todo replace with enum
    switch (id) {
      case 0:
        this._snack.open('Please login first!', 'Close');
        break;
      case 1:
        this._snack.open('No genres added! They likely exist already.', 'Close');
        break;
      case 2:
        this._snack.open('No subgenres assigned! They likely exist already.', 'Close');
        break;
    }
    return false;
  }
}
