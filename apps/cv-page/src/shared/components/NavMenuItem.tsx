import React from 'react';

type NavMenuItemProps = {
    children: string;
    href: string;
};

export const NavMenuItem = ({ children, href }: NavMenuItemProps) => (
    <li className="text-gray-300 hover:text-white">
        <a href={href}>
            {children}
        </a>
    </li>
);

