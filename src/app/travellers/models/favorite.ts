import {Traveller} from "./traveller";
import {Places} from "../../bussiness/model/places";

export interface Favorite {
  id: number;
  traveller_Id: Traveller;
  places_Id: Places;
}
