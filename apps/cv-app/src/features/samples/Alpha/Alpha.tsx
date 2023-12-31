import type { AnyObject, Nullable } from '@sandbox/types';
import { clsx } from 'clsx';
import { XMLParser } from 'fast-xml-parser';
import React, { useCallback, useEffect, useState } from 'react';

import { Dropzone, type DropzoneProps, GradientText, Link, Page, Section, useFirstMountState } from '@/shared';

import { ENCODING, PARSER_OPTIONS, REPORT_TYPE } from './constants';
import { Area, Datetime, FileName, Sender } from './sections';

const parser = new XMLParser(PARSER_OPTIONS);

export const Alpha = () => {
    const isFirstMount = useFirstMountState();

    const [reader, setReader] = useState<Nullable<FileReader>>(null);
    const [error, setError] = useState<string>('');
    const [report, setReport] = useState<Nullable<AnyObject>>(null);
    const [file, setFile] = useState<Nullable<File>>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleDrop: DropzoneProps['onDrop'] = useCallback((newFile: File) => {
        if (reader) {
            setLoading(true);
            setFile(newFile);

            reader.onload = () => {
                setError('');
                setReport(parser.parse(String(reader.result)) as AnyObject);
            };

            try {
                reader.readAsText(newFile, ENCODING);
            }
            catch (errorData: unknown) {
                setError(String(errorData));
            }
        }
    }, [reader]);

    const handleError: DropzoneProps['onError'] = useCallback((errorData) => {
        setError(errorData);
    }, []);

    useEffect(() => {
        if (isFirstMount) {
            setReader(new FileReader());
        }
    }, [isFirstMount]);

    useEffect(() => {
        setLoading(false);
    }, [report, error]);

    return (
        <Page>
            <Section title={<GradientText>Просмотр отчетов &quot;ENERGY ALPHA&quot;</GradientText>}>
                <div className="flex grow flex-col gap-2 rounded-sm bg-gray-800 p-4 sm:flex-row">
                    <div className="basis-3/4">
                        <FileName file={file} />
                        <Link
                            download
                            href="/assets/xml/80020_7706284124_20221031_9186767_7800013400.xml"
                            text="Скачать пример отчёта" />
                    </div>
                    <div className="mt-6 basis-1/4 sm:mt-0">
                        <div className="flex w-full flex-col items-center justify-center">
                            <Dropzone
                                acceptTypes={[REPORT_TYPE]}
                                isLoading={isLoading}
                                label="Загрузить файл отчёта"
                                onDrop={handleDrop}
                                onError={handleError} />
                        </div>
                        {error
                            ? (
                                <div
                                    className={clsx(
                                        'mt-2 flex w-full',
                                        'items-center justify-center',
                                        'text-red-700'
                                    )}>
                                    {error}
                                </div>
                            )
                            : null}

                    </div>
                </div>
                <Datetime report={report} />
                <Sender report={report} />
                <Area report={report} />
            </Section>
        </Page>
    );
};
