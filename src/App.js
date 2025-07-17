import React from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import ArticleList from './components/ArticleList/ArticleList';
import Article from './components/Article/Article';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/Authentication/RegisterPage/RegisterPage';
import ProfilePage from './components/Authentication/ProfilePage/ProfilePage';
import LoginPage from './components/Authentication/LoginPage/LoginPage';
import NewArticlePage from './components/NewArticlePage/NewArticlePage';
import EditArticlePage from './components/EditArticlePage/EditArticlePage';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/new-article" element={<NewArticlePage />} />
            <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
