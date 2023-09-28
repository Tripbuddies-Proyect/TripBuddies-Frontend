import {Places} from "../../bussiness/model/places";
import {Traveller} from "./traveller";

export interface Adquisicions{
    id: number;
    date  : String;
    places:Places;
    traveller:Traveller;
}
