import { authorize } from '../middlewares';
import { ProfilesService } from '../service';

class ProfilesController {
    private service: ProfilesService = new ProfilesService();

    public getProfiles = authorize(this.service.getProfiles);
}

export default new ProfilesController();
