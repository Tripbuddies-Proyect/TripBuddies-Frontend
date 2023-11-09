import {BussinessComponent} from "./bussiness";
import {Bussiness} from "../../public/register/model/bussiness";
import {Review} from "../../travellers/models/review";

export interface Places{
  id:number,
  name:string,
  description:string,
  imageUrl:string,
  price: number,
  destino:string,
  date:string,
  hour:string,
  origen:string,
  carriers: Bussiness,
}
