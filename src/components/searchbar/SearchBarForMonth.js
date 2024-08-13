import React from 'react';
import { SearchContainer, SearchTable, SearchButton, SearchInput, Select } from './SearchBarStyles';

const SearchBarForMonth = ({
    searchBy,
    setSearchBy,
    searchTerm,
    setSearchTerm,
    selectedMonth,
    setSelectedMonth,
    handleSearch,
}) => {
    return (
        <SearchContainer>
            <SearchTable>
                <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '75%' }} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>검색어</th>
                        <td>
                            <Select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                                <option value="id">ID</option>
                                <option value="name">이름</option>
                            </Select>
                            <SearchInput
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>일자</th>
                        <td>
                            <SearchInput
                                type="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </SearchTable>
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
    );
};

export default SearchBarForMonth;
