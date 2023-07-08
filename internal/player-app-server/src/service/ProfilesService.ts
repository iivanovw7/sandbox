import type { TBasicApiList, TProfile } from '../types';
import profiles from '../stub/profiles.json';
import { Result } from '../utils';
import { Response as MirageResponse } from 'miragejs';
import { HttpStatus } from '@sandbox/types';

export default class ProfilesService {
    public getProfiles() {
        return new MirageResponse(
            HttpStatus.OK,
            {},
            Result.success<TBasicApiList<TProfile>>({
                count: profiles.length,
                data: profiles,
            })
        );
    }
}
