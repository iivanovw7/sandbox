import { HttpStatus } from '@sandbox/types';
import { Response as MirageResponse } from 'miragejs';

import profiles from '../stub/profiles.json';
import type { TBasicApiList, TProfile } from '../types';
import { Result } from '../utils';


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
