import { Component } from '@angular/core';
import {MusiqueService} from "../../services/app/musique/musique.service";
import {User} from "../../models/app/musique/user.model";
import {MuhLoginDialogComponent} from "../_dialogs/muh-login-dialog/muh-login-dialog.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'musique-hub',
  templateUrl: './musique-hub.component.html',
  styleUrls: ['./musique-hub.component.scss']
})
export class MusiqueHubComponent {

  public currentPage: string = 'home';

  public usernameInput: string = '';
  public passwordInput: string = '';
  public lastLoginStatus: string = '';

  public constructor(private _dialog: MatDialog,
                     private _musiqueService: MusiqueService) {
    this.getUsers();
    this.currentPage = 'add';
  }

  public getUsers(): void {
    this._musiqueService.getUsers().subscribe((user) => {
      console.log(user);
    });
  }

  public openLogin(): void {
    // Opening the dialog without custom configuration for simplicity
    let dialogRef: MatDialogRef<MuhLoginDialogComponent> = this._dialog.open(MuhLoginDialogComponent);

    // Assign cancelLogin function with preserved context
    dialogRef.componentInstance.cancelLogin = dialogRef.close.bind(dialogRef);
  }

  public isCurrentPage(page: string): boolean {
    return this.currentPage == page;
  }

  public setCurrentPage(page: string): void {
    this.currentPage = page;
  }

  protected readonly MuhLoginDialogComponent = MuhLoginDialogComponent;
}
