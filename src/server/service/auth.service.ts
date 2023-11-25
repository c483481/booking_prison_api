import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { AuthService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { createData } from "../../utils/helper.utils";
import { UsersRegister_Paayload } from "../dto/auth.dto";
import { UsersResult } from "../dto/users.dto";
import { UsersCreationAttributes } from "../model/users.model";
import { BaseService } from "./base.service";
import { composeUsers } from "./users.service";

export class Auth extends BaseService implements AuthService {
    private usersRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.usersRepo = repository.users;
    }

    registerUser = async (payload: UsersRegister_Paayload): Promise<UsersResult> => {
        const { username, password } = payload;

        const newPassword = await bcryptModule.hash(password);

        const createdValue = createData<UsersCreationAttributes>({
            username,
            password: newPassword,
            role: "USR",
        });

        const result = await this.usersRepo.createUsers(createdValue);

        return composeUsers(result);
    };
}
