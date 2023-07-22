import { authorize } from '../middlewares';
import { BillboardService } from '../service';

class BillboardController {
    private service: BillboardService = new BillboardService();

    public getBillboard = authorize(this.service.getBillboard);
}

export default new BillboardController();
