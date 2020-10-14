import React from 'react';
import {HomeOutlined, UnorderedListOutlined, HistoryOutlined, LockOutlined} from '@ant-design/icons';

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <HomeOutlined />,
        cName: 'nav-text'
    },
    {
        title: 'Todo',
        path: '/todo',
        icon: <UnorderedListOutlined />,
        cName: 'nav-text'
    },
    {
        title: 'Transaction History',
        path: '/transaction-history',
        icon: <HistoryOutlined />,
        cName: 'nav-text'
    },
    {
        title: 'Change Password',
        path: '/change-password',
        icon: <LockOutlined />,
        cName: 'nav-text'
    },
]