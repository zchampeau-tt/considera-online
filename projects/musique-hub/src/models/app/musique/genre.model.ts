export class Genre {
  public id: string = '';
  public parentId: string | undefined = undefined;
  public parentGenre: Genre | undefined = undefined;
  public name: string = '';

  public constructor(name: string = '') {
    this.name = name;
  }

  public static equals(left: Genre | undefined, right: Genre | undefined): boolean {
    return left !== undefined && right !== undefined && left.id === right.id;
  }
}
