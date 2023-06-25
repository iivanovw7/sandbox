import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { Accept, DropzoneOptions, DropzoneState, FileError } from 'react-dropzone';
import * as ReactDropzone from 'react-dropzone';

import type { ErrorMessage, Maybe, Pixels } from '@/shared/types';

type DropError = FileError['code'];
type UseDropzone = (options?: DropzoneOptions) => DropzoneState;

export type AcceptType = 'XML';
export type AcceptMimeType = {
    extensions: Array<string>;
    key: string;
};

const MIME_TYPES: Record<AcceptType, AcceptMimeType> = {
    XML: {
        extensions: ['.xml'],
        key: 'application/xml'
    },
};

export type DropzoneProps = {
    acceptTypes: AcceptType[];
    afterDropContent?: ReactNode;
    beforeDropContent?: ReactNode;
    className?: string;
    disabled?: boolean;
    imageSize?: Pixels;
    isLoading?: boolean;
    label?: string;
    onDelete?: () => void;
    onDrop: (file: File) => void;
    onError: (error: ErrorMessage) => void;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { useDropzone } = 'useDropzone' in ReactDropzone
    ? ReactDropzone
// @ts-ignore eslint-disable-next-line import/namespace
    : ReactDropzone.default;

export const Dropzone: React.FC<DropzoneProps> = (props) => {
    const {
        acceptTypes,
        className,
        disabled,
        isLoading,
        label,
        onDrop,
        onError
    } = props;

    const accept = useMemo(() => {
        const result: Accept = {};

        for (const type of acceptTypes) {
            const { extensions, key } = MIME_TYPES[type];

            if (key in result) {
                result[key] = [...(result[key] || []), ...extensions];
            }
            else {
                result[key] = extensions;
            }
        }

        return result;
    }, [acceptTypes]);

    const getErrorMessage = useCallback(
        (code: DropError) => {
            const errors: Partial<Record<DropError, Maybe<string>>> = {
                'file-invalid-type': `Тип файла не ${acceptTypes.join(' и не ')}`,
            };

            return errors[code] || 'Неизвестная ошибка';
        },
        [acceptTypes]
    );

    // eslint-disable-next-line consistent-return
    const handleDrop: DropzoneOptions['onDrop'] = ([acceptedFiles], [rejection]): void => {
        if (rejection) {
            const errors = rejection.errors.map(({ code }) => getErrorMessage(code));

            return onError(errors.join(', '));
        }

        if (acceptedFiles) {
            onDrop(acceptedFiles);
        }
    };

    const { getInputProps, getRootProps } = (useDropzone as UseDropzone)({
        accept,
        disabled,
        maxFiles: 1,
        multiple: false,
        onDrop: handleDrop,
    });

    return (
        <div className={clsx('flex w-full items-center justify-center', className)}>
            <label
                {...getRootProps()}
                className={clsx(
                    'flex h-36 w-full flex-col',
                    'cursor-pointer',
                    'items-center justify-center',
                    'rounded-lg border-2 border-dashed border-gray-600',
                    'bg-gray-700 hover:border-gray-500 hover:bg-gray-600'
                )}>
                <input {...getInputProps()} />
                {
                    isLoading
                        ? (
                            <div role="status">
                                <svg
                                    className="mr-2 inline h-10 w-10 animate-spin fill-cyan-400 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 100 101"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        // eslint-disable-next-line max-len
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor" />
                                    <path
                                        // eslint-disable-next-line max-len
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )
                        : (
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                    aria-hidden="true"
                                    className="mb-3 h-10 w-10 text-cyan-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        // eslint-disable-next-line max-len
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2">
                                    </path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-400">
                                    <span className="font-semibold">{label}</span>
                                </p>
                                <p className="text-xs text-gray-400">
                                    {acceptTypes.join(', ')}
                                </p>
                            </div>
                        )
                }
            </label>
        </div>
    );
};
