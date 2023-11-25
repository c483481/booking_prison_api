import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
}

export interface UsersRepository {
    createUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByUsername(username: string): Promise<UsersAttributes | null>;
}
