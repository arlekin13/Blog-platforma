import React, { useEffect, useState } from 'react';
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
import { getCurrentUser } from './components/api/api';
import PrivateRoute from './components/PrivateRoute'; // импортируем приватный роут

function App() {
  const[user,setUser]=useState(null)
  const[isAuth,setIsAuth]=useState(false)
  const[loading,setLoading]=useState(false)
  useEffect(()=>{
    const checkAuth= async () => {
      const token=localStorage.getItem('token')
      if(!token){
        setLoading(false)
        return
      }
      try{
        const data=await getCurrentUser()
        setUser(data.user)
        setIsAuth(true)
      }catch(error){
        localStorage.removeItem('token')
        setUser(null)
        setIsAuth(false)
      }finally{
        setLoading(false)
      }
    }
    checkAuth()
  },[])

  if(loading){
    return <div style={{textAlign: 'center', marginTop: 50}}>Загрузка...</div>
  }

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header user={user} isAuth={isAuth} />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuth={isAuth}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-article"
              element={
                <PrivateRoute isAuth={isAuth}>
                  <NewArticlePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/articles/:slug/edit"
              element={
                <PrivateRoute isAuth={isAuth}>
                  <EditArticlePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
