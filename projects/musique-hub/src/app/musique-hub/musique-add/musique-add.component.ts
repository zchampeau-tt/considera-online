import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MusiqueService} from "../../../services/app/musique/musique.service";
import {MuhLoginDialogComponent} from "../../_dialogs/muh-login-dialog/muh-login-dialog.component";
import {Artist} from "../../../models/app/musique/artist.model";

@Component({
  selector: 'app-musique-add',
  templateUrl: './musique-add.component.html',
  styleUrls: ['./musique-add.component.scss']
})
export class MusiqueAddComponent implements OnInit {
  public myControl = new FormControl('');
  public options: string[] = ['Rock', 'Post-Rock', 'Progressive Rock'];
  public filteredOptions: Observable<string[]> = new Observable<string[]>();
  public showFiller: boolean = false;

  public album: string = '';
  public artist: string = '';
  public genre: string = '';
  public song: string = '';

  public artistInput: string = '';
  public originInput: string = '';
  public formDateInput: string = '';
  public bioInput: string = '';
  public genreInput: string = '';

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

  public setGenreInput(value: string): void {
    this.genreInput = value;
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
        this._snack.open('Artist added!', 'Close');
      },
      error => {
        console.log('Error: ' + error);
        this._snack.open('Error!', 'Close');
      }
    );

  }

  public addMusic(): void {
    console.log('Album: ' + this.album);
    console.log('Artist: ' + this.artist);
    console.log('Genre: ' + this.genre);
    console.log('Song: ' + this.song);
  }

 public  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  protected readonly MuhLoginDialogComponent = MuhLoginDialogComponent;
}
