import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper } from '../../components/register/AdminStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';

const RegisterBeacon = () => {
    const [formData, setFormData] = useState({
        macAddr: '',  // 백엔드에서 기대하는 필드명에 맞춤
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // macAddr 필드만 포함하여 백엔드로 전송
            const response = await apiClient.post('/beacons', formData);

            if (response.status !== 201) {  // HTTP 201이 생성 성공 상태 코드
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 성공 시 처리
            alert('비콘이 성공적으로 등록되었습니다.');
            setFormData({
                macAddr: '',  // 필드를 초기화
            });
        } catch (error) {
            console.error('Error registering beacon:', error);
            
            if (error.response && error.response.status === 400) {
                alert('잘못된 요청입니다. 요청 데이터를 확인하세요.');
            } else {
                alert('비콘 등록에 실패했습니다.');
            }
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
            <Title>비콘 정보 등록</Title>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <Label>비콘 MAC 주소</Label>
                        <Input type="text" name="macAddr" value={formData.macAddr} onChange={handleChange} required />
                    </FormRow>
                    <ButtonContainer>
                        <Button type="submit">등록</Button>
                    </ButtonContainer>
                </form>
            </FormWrapper>
        </>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default RegisterBeacon;
