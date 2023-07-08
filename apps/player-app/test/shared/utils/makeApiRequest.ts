/**
 * Module contains makeApiRequest tests
 */
import { makeApiRequest, noop, wait } from '../../../src/shared/utils';
import type { AnyObject } from '@sandbox/types';

const onErrorMock = vi.fn();
const onLoadingMock = vi.fn();

const successRequest = async () => wait(true, 5);
const ERROR_MESSAGE = 'Test error';
const error = new Error(ERROR_MESSAGE);

let undef;

vi.mock('../../../src/shared/log', async () => {
    const actual: AnyObject = await vi.importActual('../../../src/shared/log');

    return {
        ...actual,
        getLogger: () => ({
            error: vi.fn()
        })
    };
});

describe('shared/utils', () => {
    describe('makeApiRequest', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('Should return true', async () => {
            const result = await makeApiRequest({
                onRequestError: noop,
                request: successRequest
            });

            expect(result).toBe(true);
        });

        it('Should set loading twice', async () => {
            const result = await makeApiRequest({
                onRequestError: noop,
                request: successRequest,
                setLoading: onLoadingMock,
            });

            expect(onLoadingMock).toHaveBeenCalledWith(true);
            expect(onLoadingMock).toHaveBeenCalledWith(false);
            expect(result).toBe(true);
        });

        it('Should call onError', async () => {
            const result = await makeApiRequest({
                onRequestError: onErrorMock,
                request: () => {
                    throw error;
                },
            });

            expect(onErrorMock).toHaveBeenCalledWith(error);
            expect(result).toBe(undef);
        });
    });
});
