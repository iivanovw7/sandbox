import React, { type ReactNode } from 'react';

type NavMenuProps = {
    children: ReactNode;
};

export const NavMenu = ({ children }: NavMenuProps) => (
    <nav>
        <ul className="flex gap-x-3 font-medium text-gray-200">
            {children}
        </ul>
    </nav>
);
