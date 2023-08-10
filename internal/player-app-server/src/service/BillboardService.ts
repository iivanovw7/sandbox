import { HttpStatus } from '@sandbox/types';
import { Response as MirageResponse } from 'miragejs';

import billboard from '../stub/billboard.json';
import type { TBillboard } from '../types';
import { Result } from '../utils';

export class BillboardService {
    public getBillboard() {
        return new MirageResponse(
                HttpStatus.OK,
                {},
                Result.success<TBillboard>(billboard)
        );
    }
}
