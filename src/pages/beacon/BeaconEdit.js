import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useLocation } from 'react-router-dom';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper, Select } from '../../components/register/AdminStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';

const EditBeacon = () => {
    const location = useLocation();
    const [macList, setMacList] = useState([]); // DB에서 가져온 MAC 주소 리스트
    const [selectedMac, setSelectedMac] = useState(location.state?.selectedMacAddr || ''); // 사용자가 선택한 기존 MAC 주소
    const [newMacAddr, setNewMacAddr] = useState(''); // 수정할 MAC 주소

    // 컴포넌트가 마운트될 때, DB에 저장된 모든 MAC 주소를 가져옵니다.
    useEffect(() => {
        const fetchMacAddresses = async () => {
            try {
                const response = await apiClient.get('/beacons'); // DB에서 모든 MAC 주소를 가져옴
                setMacList(response.data.content); // 가져온 데이터를 macList에 저장
            } catch (error) {
                console.error('Error fetching MAC addresses:', error);
                alert('MAC 주소를 불러오는 데 실패했습니다.');
            }
        };
        fetchMacAddresses();
    }, []);

    const handleMacSelection = (e) => {
        setSelectedMac(e.target.value);
    };

    const handleNewMacChange = (e) => {
        setNewMacAddr(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 선택한 MAC 주소의 ID를 경로에 포함하여 PUT 요청
            const selectedMacObj = macList.find(mac => mac.macAddr === selectedMac);
            if (!selectedMacObj) {
                throw new Error('선택된 MAC 주소에 해당하는 ID를 찾을 수 없습니다.');
            }
    
            // 서버로 전송할 데이터는 BeaconRequest DTO에 맞게 설정
            const response = await apiClient.put(`/beacons/${selectedMacObj.id}`, {
                macAddr: newMacAddr,  // 서버가 기대하는 필드명으로 맞춤
            });
    
            if (response.status !== 200) {  // HTTP 200이 성공 상태 코드
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // 성공 시 처리
            alert('비콘 MAC 주소가 성공적으로 수정되었습니다.');
            setSelectedMac(''); // 선택 필드를 초기화
            setNewMacAddr(''); // 새 MAC 주소 필드를 초기화
        } catch (error) {
            console.error('Error editing beacon:', error);
            alert('비콘 MAC 주소 수정에 실패했습니다.');
        }
    };
    
    

    const leftContent = (
        <div>
            <SubTitle>비콘 관리</SubTitle>
            <Divider />
            <StyledNavLink to="/beacon" activeClassName="active">
                비콘 리스트 조회
            </StyledNavLink>
            <StyledNavLink to="/registerbeacon" activeClassName="active">
                비콘 정보 등록
            </StyledNavLink>
            <StyledNavLink to="/editbeacon" activeClassName="active">
                비콘 정보 수정
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <>
            <Title>비콘 정보 수정</Title>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <Label>수정할 MAC 주소 선택</Label>
                        <Select value={selectedMac} onChange={handleMacSelection} required>
                            <option value="" disabled>MAC 주소를 선택하세요</option>
                            {macList.map((mac) => (
                                <option key={mac.id} value={mac.macAddr}>
                                    {mac.macAddr}
                                </option>
                            ))}
                        </Select>
                    </FormRow>
                    <FormRow>
                        <Label>새로운 MAC 주소</Label>
                        <Input
                            type="text"
                            name="newMacAddr"
                            value={newMacAddr}
                            onChange={handleNewMacChange}
                            required
                        />
                    </FormRow>
                    <ButtonContainer>
                        <Button type="submit">정보 수정</Button>
                    </ButtonContainer>
                </form>
            </FormWrapper>
        </>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default EditBeacon;
