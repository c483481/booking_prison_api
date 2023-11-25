import { UsersRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Users, UsersAttributes, UsersCreationAttributes } from "../model/users.model";
import { BaseRepository } from "./base.repository";

export class SequelizeUsersRepository extends BaseRepository implements UsersRepository {
    private users!: typeof Users;
    init(datasource: AppDataSource): void {
        this.users = datasource.sqlModel.Users;
    }

    createUsers = async (payload: UsersCreationAttributes): Promise<UsersAttributes> => {
        return this.users.create(payload);
    };
}
