import React from 'react';
import { UserProfileTableContainer, UserProfileTable } from './TableStyles';

const UserProfileTableComponent = ({ user }) => {
    const fields = [
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '이름' },
        { key: 'phone', label: '휴대폰 번호' },
        { key: 'email', label: '이메일' },
        { key: 'position', label: '직책' },
    ];

    return (
        <UserProfileTableContainer>
            <UserProfileTable>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.key}>
                            <th>{field.label}</th>
                            <td>{user[field.key] || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </UserProfileTable>
        </UserProfileTableContainer>
    );
};

export default UserProfileTableComponent;
