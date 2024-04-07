import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpMusiqueUserService} from "../../http/http-musique/http-musique-user/http-musique-user.service";
import {User} from "../../../models/app/musique/user.model";
import {HttpMusiqueService} from "../../http/http-musique/http-musique.service";
import {HttpMusiqueHubService} from "../../http/http-musique/http-musique-user/http-musique-hub.service";
import {Artist} from "../../../models/app/musique/artist.model";

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {
  private readonly GET_ACTION = '';
  private readonly GET_USERS_ACTION = 'getUsers';
  private readonly GET_USER_ACTION = 'getUser';
  private readonly ADD_ARTIST_ACTION = 'addArtist';
  private readonly LOGIN_ACTION = 'login';
  private readonly REGISTER_ACTION = 'register';

  // maybe i can store user here? research

  constructor(private httpMusiqueUserService: HttpMusiqueUserService,
              private httpMusiqueHubService: HttpMusiqueHubService) {}

  public getUsers(): Observable<User[]> {
    return this.httpMusiqueUserService.get(this.GET_USERS_ACTION, new HttpParams()) as Observable<User[]>;
  }

  public addArtist(artist: Artist): Observable<boolean> {
    return this.httpMusiqueHubService.get(this.ADD_ARTIST_ACTION, new HttpParams()
      .append('artist', artist.name)
      .append('origin', artist.origin)
      .append('formed', artist.formedDate.toISOString())
      .append('bio', artist.bio)
      .append('authorId', artist.authorId)
      .append('verifierId', artist.verifierId)
    ) as Observable<boolean>;
  }

  public login(username: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpMusiqueUserService.get(this.LOGIN_ACTION, params) as Observable<User>;
  }

  public register(username: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpMusiqueUserService.get(this.REGISTER_ACTION, params) as Observable<User>;
  }
}
