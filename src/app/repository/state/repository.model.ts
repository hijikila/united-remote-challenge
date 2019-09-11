export class Repository {
  constructor(
    public repositoryName: string = '',
    public description: string = '',
    public stars: number = 0,
    public issues: number = 0,
    public username: string = '',
    public avatarUrl: string = '',
    public creationDaysElapsed: number = 0) {}
}
