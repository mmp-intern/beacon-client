import React from 'react';
import { TableContainer, VerticalTable } from './TableStyles';

const UserProfileTableComponent = ({ user, role }) => {
    // 슈퍼관리자와 관리자는 아이디와 권한만 볼 수 있게 설정
    const fields = role === 'SUPER_ADMIN' || role === 'ADMIN'
        ? [
            { key: 'userId', label: '아이디' },
            { key: 'role', label: '권한' }
        ]
        : [
            { key: 'userId', label: '아이디' },
            { key: 'name', label: '이름' },
            { key: 'phone', label: '휴대폰 번호' },
            { key: 'email', label: '이메일' },
            { key: 'position', label: '직책' },
            { key: 'role', label: '권한' },
        ];

    return (
        <TableContainer>
            <VerticalTable>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.key}>
                            <th>{field.label}</th>
                            <td>{user[field.key] || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </VerticalTable>
        </TableContainer>
    );
};

export default UserProfileTableComponent;
