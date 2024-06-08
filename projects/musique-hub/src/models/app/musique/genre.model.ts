export class Genre {
  public id: string = '';
  public parentId: string | undefined = undefined;
  public parentGenre: Genre | undefined = undefined;
  public name: string = '';
  public description: string = '';

  public constructor(name: string = '', description: string = '') {
    this.name = name;
    this.description = description;
  }

  public static equals(left: Genre | undefined, right: Genre | undefined): boolean {
    return left !== undefined && right !== undefined && left.id === right.id;
  }
}
