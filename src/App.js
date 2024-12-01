import React from 'react';
import { Layout } from 'antd';
import MovieList from './components/movieList';
import './App.css';

const { Header, Content, Footer } = Layout;


function App() {
  return (
    <Layout>
      <Header style={{ background: '#001529', color: '#fff', textAlign: 'center', fontSize: '24px' }}>
        Movie Management
      </Header>

      <Content style={{ padding: '24px', background: '#fff' }}>
        <MovieList/>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Movie Management App ©2024 Created with React & Ant Design
      </Footer>

    </Layout>
    
  );
}

export default App;
