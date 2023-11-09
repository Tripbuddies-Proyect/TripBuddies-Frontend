import {Traveller} from "./traveller";

export interface Friendship {
  id: number;
  user_id: Traveller;
  friend: Traveller;
}
