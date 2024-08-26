import React from 'react';
import { TableContainer, VerticalTable } from './TableStyles';

const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '-';
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

const formatMacAddr = (macAddr) => {
    if (!macAddr || !Array.isArray(macAddr)) return '-';
    return macAddr.join(', ');
};

const getRoleInKorean = (role) => {
    switch (role) {
        case 'SUPER_ADMIN':
            return '슈퍼관리자';
        case 'ADMIN':
            return '관리자';
        case 'USER':
            return '직원';
        default:
            return role;
    }
};

const UserProfileTableComponent = ({ user, role }) => {
    const fields = role === 'SUPER_ADMIN' || role === 'ADMIN'
        ? [
            { key: 'userId', label: '아이디' },
            { key: 'role', label: '권한', format: getRoleInKorean }
        ]
        : [
            { key: 'userId', label: '아이디' },
            { key: 'name', label: '이름' },
            { key: 'phone', label: '휴대폰 번호', format: formatPhoneNumber },
            { key: 'email', label: '이메일' },
            { key: 'position', label: '직책' },
            { key: 'macAddr', label: '비콘', format: formatMacAddr },
            { key: 'role', label: '권한', format: getRoleInKorean },
        ];

    return (
        <TableContainer>
            <VerticalTable>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.key}>
                            <th>{field.label}</th>
                            <td>{field.format ? field.format(user[field.key]) : (user[field.key] || '-')}</td>
                        </tr>
                    ))}
                </tbody>
            </VerticalTable>
        </TableContainer>
    );
};

export default UserProfileTableComponent;
