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
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(currentYear - 1999), (v, i) => currentYear - i);

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setSelectedYear(newYear);
    };

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
                            <Select value={selectedYear} onChange={handleYearChange}>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Select>
                        </td>
                    </tr>
                </tbody>
            </SearchTable>
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
    );
};

export default SearchBarForYear;
