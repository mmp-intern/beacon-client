// Layout.js
import React from 'react';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import { MainContainer, LeftSidebar, ContentArea, RightSpace } from './LayoutStyles';

const Layout = ({ leftContent, mainContent }) => {
    return (
        <div>
            <Navbar />
            <MainContainer>
                <LeftSidebar>{leftContent}</LeftSidebar>
                <ContentArea>{mainContent}</ContentArea>
                <RightSpace />
            </MainContainer>
            <Footer />
        </div>
    );
};

export default Layout;
