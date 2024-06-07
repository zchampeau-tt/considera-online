import {Genre} from "../../../../models/app/musique/genre.model";

export class GenreTreeModel {
  public genre: Genre = new Genre();
  public childGenres: GenreTreeModel[] = [];

  public constructor(genre: Genre = new Genre()) {
    this.genre = genre;
    this.childGenres = [];
  }
}
