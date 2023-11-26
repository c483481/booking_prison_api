import { NapiRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Napi, NapiAttributes, NapiCreationAttributes } from "../model/napi.model";
import { BaseRepository } from "./base.repository";

export class SequelizeNapiRepository extends BaseRepository implements NapiRepository {
    private napi!: typeof Napi;
    init(datasource: AppDataSource): void {
        this.napi = datasource.sqlModel.Napi;
    }

    insertNapi = async (payload: NapiCreationAttributes): Promise<NapiAttributes> => {
        return this.napi.create(payload);
    };
}
