import {AfterViewInit, Component, NgZone} from '@angular/core';
import {MusiqueService} from "../../../../services/app/musique/musique.service";
import {Genre} from "../../../../models/app/musique/genre.model";
import {GenreTreeModel} from "../model/genre-tree.model";
import {MusiqueListService} from "../service/musique-list.service";
import {
  FlatTreeControl,
  NestedTreeControl,
  TreeControl
} from "@angular/cdk/tree";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource
} from "@angular/material/tree";

@Component({
  selector: 'app-musique-list',
  templateUrl: './musique-list.component.html',
  styleUrls: ['./musique-list.component.scss']
})
export class MusiqueListComponent {

  public genres: GenreTreeModel[] = [];

  public genresDataSource: MatTreeNestedDataSource<GenreTreeModel> =
    new MatTreeNestedDataSource<GenreTreeModel>();

  public treeControl : NestedTreeControl<GenreTreeModel> =
    new NestedTreeControl<GenreTreeModel>(node => node.childGenres);

  public hasChild = (_: number, node: GenreTreeModel) =>
    !!node.childGenres && node.childGenres.length > 0

  public constructor(private _musicService: MusiqueService,
                     private _musicListService: MusiqueListService,
                     private _zone: NgZone) {}

  public grabGenres(): void {
    this._musicService
      .getGenres()
      .subscribe(
        (result: Genre[]) => {
          this.genres = [];
          this.genresDataSource.data =
            this.genres =
              this._musicListService.makeGenresTree(result);
          this._zone.run(() => {});
          console.log(this.genres);
        },
        error => {
          console.log('Error: ' + error);
        }
      );
  }

  public onView(): void {
    this.grabGenres();
  }
}
