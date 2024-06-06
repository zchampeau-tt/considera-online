export class Genre {
  public id: string = '';
  public parentId: string = '';
  public name: string = '';

  public constructor(name: string = '') {
    this.name = name;
  }
}
