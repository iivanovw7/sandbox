import React from 'react';

import type { Nullable } from '@/shared';
import { GradientText } from '@/shared';

type FileNameProps = {
    file?: Nullable<File>;
};

export const FileName = (props: FileNameProps) => {
    const { file } = props;

    return (
        <div className="flex flex-col rounded-sm bg-gray-800">
            <span>Для вывода отчета загрузите файл отчёта с расширением XML</span>
            <GradientText className="my-2">{file?.name || ''}</GradientText>
        </div>
    );
};
