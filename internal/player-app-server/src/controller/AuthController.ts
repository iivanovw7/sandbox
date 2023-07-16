import { AuthService } from '../service';

class AuthController {
    private service: AuthService = new AuthService();

    public login = this.service.login;
    public refresh = this.service.refresh;
}

export default new AuthController();
