import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    min-height: 100vh;
    box-sizing: border-box;
`;

export const LeftSidebar = styled.div`
    flex: 0 1 300px;
    min-width: 200px;
    background-color: #f1f1f1;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

    h3 {
        margin-bottom: 10px;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
            margin: 5px 0;
            padding: 5px 0;
            cursor: pointer;

            &:hover {
                color: #007bff;
                text-decoration: underline;
            }
        }
    }
`;

export const ContentArea = styled.div`
    flex: 1;
    min-width: 0;
    padding: 20px;
    background-color: #ffffff;
    border-left: 1px solid #e0e0e0;
    overflow: auto;
`;

export const RightSpace = styled.div`
    flex: 0 1 300px;
    min-width: 200px;
    background-color: #f1f1f1;
    padding: 20px;
    box-sizing: border-box;
`;
