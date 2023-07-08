import React, { type ReactNode } from 'react';

type NavbarProps = {
    children: ReactNode;
};

export const NavbarTwoColumns = ({ children }: NavbarProps) => (
    <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
        {children}
    </div>
);
