import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MusiqueService} from "../../../../services/app/musique/musique.service";
import {MuhLoginDialogComponent} from "../../../_dialogs/muh-login-dialog/muh-login-dialog.component";
import {Artist} from "../../../../models/app/musique/artist.model";

@Component({
  selector: 'app-musique-add-song',
  templateUrl: './musique-add-song.component.html',
  styleUrl: './musique-add-song.component.scss'
})
export class MusiqueAddSongComponent {
  public artistInput: string = '';
  public originInput: string = '';
  public formDateInput: string = '';
  public bioInput: string = '';
  public addArtistGenreInput: string[] = [];
  @Input() genreOptions: string[] = [];

  public constructor(private _snack: MatSnackBar,
                     private _musicService: MusiqueService) {}

  public setArtistInput(value: string): void {
    this.artistInput = value;
  }

  public setOriginInput(value: string): void {
    this.originInput = value;
  }

  public setFormDateInput(value: string): void {
    this.formDateInput = value;
  }

  public setBioInput(value: string): void {
    this.bioInput = value;
  }

  public setGenreInput(value: string[]): void {
    this.addArtistGenreInput = value;
  }

  public addArtist(): void {
    if (!MuhLoginDialogComponent.loggedIn()) {
      this._snack.open('Please login to add an artist!', 'Close');
      return;
    }

    if (this.artistInput === '' || this.originInput === '' || this.formDateInput === '') {
      this._snack.open('Please fill out all fields!', 'Close');
      return;
    }

    const artist = new Artist();
    artist.name = this.artistInput;
    artist.origin = this.originInput;
    artist.formedDate = new Date(this.formDateInput);
    artist.bio = this.bioInput;
    artist.authorId = MuhLoginDialogComponent.getId();
    artist.verifierId = '0';
    console.log(MuhLoginDialogComponent.currentUser);
    console.log(artist);

    this._musicService.addArtist(artist).subscribe(
      (result: boolean) => {
        console.log('Result: ' + result)
        this._snack.open('Artist added!', 'Close', {duration: 5000});
      },
      error => {
        console.log('Error: ' + error);
        this._snack.open('Error!', 'Close');
      }
    );

  }

  private _try(): boolean {
    if (!MuhLoginDialogComponent.loggedIn()) {
      this._snack.open('Please login first!', 'Close');
      return false;
    }
    return true;
  }
}
