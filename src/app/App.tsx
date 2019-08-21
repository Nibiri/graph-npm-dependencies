import React from 'react';
import { Sidebar } from '../sidebar';
import { Graph } from '../graph';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body,
    html {
      margin: 0;
      padding: 0;
      background: #333333;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
     
    }

    #root {
      height: 100%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 100%;
    font-size: 15px;
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-left: 20px;
`;

const App = ({ nodes, showPackageInfo }) => (
    <Wrapper>
        <GlobalStyle />
        <Sidebar />
        <Graph />
    </Wrapper>
);

export default App;
