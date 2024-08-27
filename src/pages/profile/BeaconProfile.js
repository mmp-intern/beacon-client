import React from 'react';
import { TableContainer, VerticalTable } from './TableStyles';

const formatMacAddr = (macAddr) => {
    if (!macAddr) return '-';
    return macAddr.match(/.{1,2}/g).join(':');
};

const BeaconProfile = ({ beacon }) => {
    const fields = [
        { key: 'id', label: 'ID' },
        { key: 'macAddr', label: 'MAC 주소', format: formatMacAddr },
        { key: 'location', label: '위치' },
        { key: 'status', label: '상태' },
        { key: 'lastSeen', label: '마지막 감지 시간' },
    ];

    return (
        <TableContainer>
            <VerticalTable>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.key}>
                            <th>{field.label}</th>
                            <td>{field.format ? field.format(beacon[field.key]) : (beacon[field.key] || '-')}</td>
                        </tr>
                    ))}
                </tbody>
            </VerticalTable>
        </TableContainer>
    );
};

export default BeaconProfile;
