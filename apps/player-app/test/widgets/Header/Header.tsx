/**
 * Module contains widgets header tests.
 */
import { Header } from '../../../src/widgets/Header/Header';
import { render } from '../../_helper/utils';

describe('widgets/Header', () => {
    it('Should render successfully', () => {
        const { baseElement } = render(() => <Header />);

        expect(baseElement).toBeTruthy();
    });
});
