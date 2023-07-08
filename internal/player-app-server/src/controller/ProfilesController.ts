import { ProfilesService } from '../service';
import { authorize } from '../middlewares';

class ProfilesController {
    private service: ProfilesService = new ProfilesService();

    public getProfiles = authorize(this.service.getProfiles);
}

export default new ProfilesController();
