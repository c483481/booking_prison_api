import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { AuthService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { jwtModule } from "../../module/jwt.module";
import { errorResponses } from "../../response";
import { createData } from "../../utils/helper.utils";
import { AuthLogin_Payload, LoginResult, UsersRegister_Payload } from "../dto/auth.dto";
import { UsersResult } from "../dto/users.dto";
import { UsersCreationAttributes } from "../model/users.model";
import { BaseService } from "./base.service";
import { composeUsers } from "./users.service";

export class Auth extends BaseService implements AuthService {
    private usersRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.usersRepo = repository.users;
    }

    registerUser = async (payload: UsersRegister_Payload): Promise<UsersResult> => {
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

    loginUsers = async (payload: AuthLogin_Payload): Promise<LoginResult> => {
        const { username, password } = payload;

        const users = await this.usersRepo.findByUsername(username);

        if (!users) {
            throw errorResponses.getError("E_AUTH_2");
        }

        if (!(await bcryptModule.compare(password, users.password))) {
            throw errorResponses.getError("E_AUTH_2");
        }

        const result = composeUsers(users) as LoginResult;

        result.key = {
            accessToken: jwtModule.issueWithAudience(users, users.role),
            refreshToken: jwtModule.issueEdit({ xid: users.xid }, 3600 * 24),
        };

        return result;
    };
}
