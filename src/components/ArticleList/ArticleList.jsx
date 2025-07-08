import React ,{useState, useEffect} from 'react';
import styles from './ArticleList.module.scss';
import ArticleItem from '../ArticleItem/ArticleItem';
import { getArticles } from '../api/api';
import {Pagination} from 'antd'


function ArticleList() {
  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState(null)
 const[currentPage, setCurrentPage]= useState(1)
 const[totalPage,setTotalPage]=useState(1)
 const limit =5


 
  useEffect(()=>{
 const fetchArticles=async(page)=>{
  try{
    const data=await getArticles(page,limit)
    setArticles(data.articles)
    setTotalPage(Math.ceil(data.articlesCount/limit))
    setLoading(false)

  }catch(error){
    setError(error.message)
    setLoading(false)
  }}
  fetchArticles(currentPage)
  },[currentPage,limit])

  const handlePageChange=(page)=>{
    setCurrentPage(page)
  }

if(loading){
  return <div style={{textAlign:'center',padding:'20px',fontSize:'20px'}}>Идёт загрузка...</div>
}
if(error){
  return <div style={{textAlign:'center',padding:'20px',fontSize:'20px'}}>Ошибка : {error.message}</div>
}


  return (
    <div className={styles.articleList}>
      <ul className={styles.articleList__content}>
        {articles.map((article, index) => (
          <ArticleItem
            key={article.slug || index}
            title={article.title}
            description={article.description}
            createdAt={article.createdAt}
            author={article.author}
            tags={article.tagList}
            slug={article.slug}
            avatar={article.author.image}
            nickname={article.author.username}
            data={article.data}
            likesCount={article.favoritesCount}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
      <Pagination 
      current={currentPage}
      total={totalPage*limit}
      pageSize={limit}
      onChange={handlePageChange}
      />
      </div>
      
    </div>
  );
}

export default ArticleList; 