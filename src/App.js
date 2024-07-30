import React from 'react';
import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer';
import { MainContainer, LeftSidebar, ContentArea, RightSpace } from './components/layout/LayoutStyles';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <MainContainer>
        <LeftSidebar>
          <h3>업무관리</h3>
          <ul>
            <li>업무현황</li>
            <li>업무일지</li>
            <li>업무일지작성</li>
            <li>외근일지</li>
            <li>외근일지작성</li>
          </ul>
        </LeftSidebar>
        <ContentArea>
          <h1>업무현황</h1>
          <p>업무관리 &gt; 업무현황</p>
        </ContentArea>
        <RightSpace />
      </MainContainer>
      <Footer />
    </div>
  );
};

export default App;