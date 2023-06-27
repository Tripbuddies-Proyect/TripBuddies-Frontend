import {Friendship} from "./friendship";
import {Review} from "./review";
import {Places} from "../../bussiness/model/places";

export interface Traveller {
  id:number,
  firstName:string,
  lastName:string,
  description:string,
  image:string,
  bannerImage:string,
  email:string,
  password:string,
  phone:string,
  matches: Array<Friendship>,
  reviews: Array<Review>,
  favorites: Array<Places>,
}
