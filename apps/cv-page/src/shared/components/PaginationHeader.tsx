import React from 'react';

type PaginationHeaderProps = {
    description: string;
    title: string;
};

export const PaginationHeader = (props: PaginationHeaderProps) => {
    const { description, title } = props;

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="mt-3 text-gray-200">{description}</div>
        </div>
    );
};
