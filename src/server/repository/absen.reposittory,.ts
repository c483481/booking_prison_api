import { AbsenRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Absen, AbsenAttrribute, AbsenCreationAttribute } from "../model/absen.model";
import { BaseRepository } from "./base.repository";

export class SequelizeAbsenRepository extends BaseRepository implements AbsenRepository {
    private absen!: typeof Absen;
    init(datasource: AppDataSource): void {
        this.absen = datasource.sqlModel.Absen;
    }

    insertAbsen = async (payload: AbsenCreationAttribute): Promise<AbsenAttrribute> => {
        return this.absen.create(payload);
    };
}
