import {Bussiness} from "../../public/register/model/bussiness";

export interface Payment{
    id: number;
    date: string;
    amount: number;
    carrier:Bussiness;
}
