import { BaseResult } from "../../module/dto.module";

export interface CellCreation_Payload {
    name: string;
    max: number;
}

export interface CellResult extends BaseResult {
    name: string;
    count: number;
    max: number;
}
