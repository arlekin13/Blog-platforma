import React from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import ArticleList from './components/ArticleList/ArticleList';
import Article from './components/Article/Article';
import { BrowserRouter, Route,Routes} from 'react-router-dom'


function App() {
  return (

    <BrowserRouter>
     <div className={styles.App}>
      <Header />

      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<ArticleList/>}/>
          <Route path='/articles' element={<ArticleList/>}/>
          <Route path='/articles/:slug' element={<Article/>}/>

        </Routes>
        
      </main>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
