import React from 'react';
import { SearchContainer, SearchTable, SearchButton, SearchInput, Select } from './SearchBarStyles';

const SearchBarForYear = ({
    searchBy,
    setSearchBy,
    searchTerm,
    setSearchTerm,
    selectedYear,
    setSelectedYear,
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
                        <th>연도</th>
                        <td>
                            <SearchInput
                                type="number"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                min={2000}
                                max={new Date().getFullYear()}
                            />
                        </td>
                    </tr>
                </tbody>
            </SearchTable>
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
    );
};

export default SearchBarForYear;
