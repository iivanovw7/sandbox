/**
 * Module contains media player creator.
 */
import { createPlayer } from '../../../../src/entities/Player/lib';

const mockInitialize = vi.fn();
const mockUpdateSettings = vi.fn();

vi.mock('dashjs', () => {
    return {
        MediaPlayer: () => {
            return {
                create: () => {
                    return {
                        initialize: mockInitialize,
                        updateSettings: mockUpdateSettings,
                    };
                },
            };
        },
    };
});

const baseParamsMock = {
    autoplay: true,
    url: 'test',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    video: 'ref' as any,
};

describe('entities/Player/lib/player', () => {
    describe('createPlayer', () => {
        afterEach(() => {
            vi.clearAllMocks();
        });

        it('Should instantiate, configure and return a dash instance', () => {
            createPlayer(baseParamsMock);

            expect(mockInitialize).toHaveBeenCalledWith(
                baseParamsMock.video,
                baseParamsMock.url,
                baseParamsMock.autoplay
            );

            expect(mockUpdateSettings).not.toHaveBeenCalled();
        });

        it('Should instantiate and update settings', () => {
            const params = {
                ...baseParamsMock,
                playerSettings: {
                    debug: {
                        logLevel: 1
                    }
                }
            };

            createPlayer(params);

            expect(mockInitialize).toHaveBeenCalledWith(
                baseParamsMock.video,
                baseParamsMock.url,
                baseParamsMock.autoplay
            );

            expect(mockUpdateSettings).toHaveBeenCalledWith(params.playerSettings);
        });
    });
});
