import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpMusiqueUserService} from "../../http/http-musique/http-musique-user/http-musique-user.service";
import {User} from "../../../models/app/musique/user.model";
import {HttpMusiqueHubService} from "../../http/http-musique/http-musique-user/http-musique-hub.service";
import {Artist} from "../../../models/app/musique/artist.model";
import {Genre} from "../../../models/app/musique/genre.model";

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {
  private readonly GET_USERS_ACTION = 'getUsers';
  private readonly GET_GENRES_ACTION = 'getGenres';
  private readonly ADD_ARTIST_ACTION = 'addArtist';
  private readonly ADD_GENRES_ACTION = 'addGenres';
  private readonly ASSIGN_SUBGENRES_ACTION = 'assignSubgenres';
  private readonly LOGIN_ACTION = 'login';
  private readonly REGISTER_ACTION = 'register';

  public genreCache: Genre[] = [];

  // maybe i can store user here? research // eh who cares for now, its my code lol

  constructor(private _httpMusiqueUserService: HttpMusiqueUserService,
              private _httpMusiqueHubService: HttpMusiqueHubService) {}

  public getUsers(): Observable<User[]> {
    return this._httpMusiqueUserService.get(this.GET_USERS_ACTION, new HttpParams()) as Observable<User[]>;
  }

  public getGenres(): Observable<Genre[]> {
    const genresObs = this._httpMusiqueHubService.get(this.GET_GENRES_ACTION, new HttpParams()) as Observable<Genre[]>;
    genresObs.subscribe((genres: Genre[]) => {
      this.genreCache = genres;
    });
    return genresObs as Observable<Genre[]>;
  }

  public setGenreCache(): void {
    const genresObs = this._httpMusiqueHubService.get(this.GET_GENRES_ACTION, new HttpParams()) as Observable<Genre[]>;
    genresObs.subscribe((genres: Genre[]) => {
      this.genreCache = genres;
    });
  }

  public addArtist(artist: Artist): Observable<boolean> {
    return this._httpMusiqueHubService.get(this.ADD_ARTIST_ACTION, new HttpParams()
      .append('artist', artist.name)
      .append('origin', artist.origin)
      .append('formed', artist.formedDate.toISOString())
      .append('bio', artist.bio)
      .append('authorId', artist.authorId)
      .append('verifierId', artist.verifierId)
    ) as Observable<boolean>;
  }

  public addGenres(genres: Genre[]): Observable<Genre[]> {
    const genreNames: string = genres.map((genre: Genre) => genre.name).join(',');
    return this._httpMusiqueHubService.get(this.ADD_GENRES_ACTION, new HttpParams() // todo: add authorid
      .append('genres', genreNames)
    ) as Observable<Genre[]>;
  }

  public assignSubgenres(author: User, genre: Genre[], subgenres: Genre[]): Observable<Genre[]> {
    const genreNames: string = genre.map((genre: Genre) => genre.name).join(',');
    const subgenreNames: string = subgenres.map((genre: Genre) => genre.name).join(',');
    return this._httpMusiqueHubService.get(this.ASSIGN_SUBGENRES_ACTION, new HttpParams()  // todo: add authorid
      .append('authorId', author.id)
      .append('genres', genreNames)
      .append('subgenres', subgenreNames)
    ) as Observable<Genre[]>;
  }

  public login(username: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this._httpMusiqueUserService.get(this.LOGIN_ACTION, params) as Observable<User>;
  }

  public register(username: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this._httpMusiqueUserService.get(this.REGISTER_ACTION, params) as Observable<User>;
  }
}
