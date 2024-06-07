import {Injectable} from "@angular/core";
import {GenreTreeModel} from "../model/genre-tree.model";
import {Genre} from "../../../../models/app/musique/genre.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MusiqueListService {
  public constructor() {}

  public makeGenresTree(genres: Genre[]): GenreTreeModel[] {
    const genreTree: GenreTreeModel[] = [];

    genres.forEach((genre: Genre) => {
      const genreModel = new GenreTreeModel(genre);

      if (genre.parentId !== null) {
        const parentGenre = genreTree
          .find(x => Genre.equals(x.genre, genres
            .find(x => x.id === genre.parentId)));

        if (parentGenre !== undefined)
          parentGenre.childGenres.push(genreModel);

      } else genreTree.push(genreModel);
    });

    return genreTree;
  }

}
