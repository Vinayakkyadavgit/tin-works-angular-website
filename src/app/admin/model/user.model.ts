export class User {
  constructor(
    public admin_id: number,
    public name: string,
    public last_login_date: Date,
    private expired_at: Date,
    private _AUTH_TOKEN: string,
  ) { }

  get AUTH_TOKEN() {
    if (!this.expired_at || new Date() > this.expired_at) {
      return null;
    } else {
      return this._AUTH_TOKEN;
    }
  }
}
