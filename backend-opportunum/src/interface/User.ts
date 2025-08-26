export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    roles: string[];       
    teams?: string[];       
  }
  