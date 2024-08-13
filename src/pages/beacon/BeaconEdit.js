import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, Button, FormRow, FormWrapper, ButtonContainer } from '../../components/register/AdminStyles';

const EditBeacon = () => {
    const [formData, setFormData] = useState({
        userId: '',
        beaconId: '',
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
            const response = await apiClient.put(`/editBeacon`, formData); // PUT 요청으로 수정

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 성공 시 처리
            alert('비콘 정보가 성공적으로 수정되었습니다.');
            setFormData({
                userId: '',
                beaconId: '',
            });
        } catch (error) {
            console.error('Error editing beacon:', error);
            alert('비콘 정보 수정에 실패했습니다.');
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
            <Title>비콘 정보 수정</Title> {/* 타이틀은 기존 그대로 유지 */}
            <FormWrapper> {/* 폼을 전체적으로 감싸는 컨테이너 */}
                <form onSubmit={handleSubmit}>
                    <FormRow> {/* 각 필드를 세로 정렬로 감싸는 컨테이너 */}
                        <Label>사용자 ID</Label>
                        <Input
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <Label>비콘 ID</Label>
                        <Input
                            type="text"
                            name="beaconId"
                            value={formData.beaconId}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <ButtonContainer> {/* 정보 수정 버튼 */}
                        <Button type="submit">정보 수정</Button>
                    </ButtonContainer>
                </form>
            </FormWrapper>
        </>
    );
    

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default EditBeacon;
