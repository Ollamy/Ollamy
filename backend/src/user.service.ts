import { Injectable } from '@nestjs/common';
import { UserModel } from "./models/user";

@Injectable()
export class UserService {
  postUser(): UserModel {
    return {Id:"", Firstname:"", Lastname:"",Email:"",Password:"",Communities_id:[]};
  }
}
