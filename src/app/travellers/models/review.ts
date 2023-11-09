import {Traveller} from "./traveller";
import {Places} from "../../bussiness/model/places";

export interface Review{
    id:number,
    reviewText:string,
    traveller: Traveller;
    places: Places;
}
