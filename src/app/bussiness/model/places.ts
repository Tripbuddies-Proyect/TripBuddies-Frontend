import {BussinessComponent} from "./bussiness";
import {Bussiness} from "../../public/register/model/bussiness";
import {Review} from "../../travellers/models/review";

export interface Places{
  id:number,
  name:string,
  description:string,
  imageUrl:string,
  price: number,
  location: string,
  country: string,
  bussiness: Bussiness,
  reviews: Review;
}
