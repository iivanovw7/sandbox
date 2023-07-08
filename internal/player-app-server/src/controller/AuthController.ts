import AuthService from '../service/AuthService';

class AuthController {
    private service: AuthService = new AuthService();

    public login = this.service.login;
    public refresh = this.service.refresh;
}

export default new AuthController();
