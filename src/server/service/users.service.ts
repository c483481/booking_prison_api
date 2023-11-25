import { getRole } from "../../constant/role.contant";
import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { UsersService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { errorResponses } from "../../response";
import { composeResult, updateData } from "../../utils/helper.utils";
import { ChangePassword_Payload, UsersResult } from "../dto/users.dto";
import { UsersAttributes } from "../model/users.model";
import { BaseService } from "./base.service";

export class Users extends BaseService implements UsersService {
    private usersRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.usersRepo = repository.users;
    }

    changePassword = async (payload: ChangePassword_Payload): Promise<void> => {
        const { userXid, password } = payload;

        const users = await this.usersRepo.findByXid(userXid);

        if (!users) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const newPassword = await bcryptModule.hash(password);

        const updatedValues = updateData<UsersAttributes>(users, {
            password: newPassword,
        });

        const result = await this.usersRepo.updateUsers(users.id, updatedValues, users.version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }
    };
}

export function composeUsers(row: UsersAttributes): UsersResult {
    return composeResult(row, {
        username: row.username,
        tagRole: row.role,
        role: getRole(row.role),
    });
}
