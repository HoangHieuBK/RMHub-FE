export class User {
   id?: string;
   name?: string;
   email?: string;
   role?: string;
   scope?: string;
   engineeringBureau?: string;
   engineeringBureauList?: Array<string>;
   timer?: number;
   username?: string;
   password?: string;

   constructor(id?: string, name?: string, email?: string, role?: string, engineeringBureau?: string, scope?: string, engineeringBureauList?: Array<string>,
      timer?: number, username?: string, password?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.engineeringBureau = engineeringBureau;
      this.scope = scope;
      this.engineeringBureauList = engineeringBureauList;
      this.timer = timer;
      this.username = username;
      this.password = password;
   }
}
