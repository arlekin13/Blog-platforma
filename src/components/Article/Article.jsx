import React,{useState,useEffect}from 'react';
import styles from './Article.module.scss';
import{useParams} from 'react-router-dom'
import{DateTime} from 'luxon'
import{getArticle} from '../api/api'
import Markdown from 'markdown-to-jsx'

function Article() {
 
  console.log("Article component mounted!");

const {slug}=useParams()
const [article,setArticle]=useState(null)
const[loading,setLoading]=useState(true)
const[error,setError]=useState(null)


useEffect(()=>{

  const fetchArticle=async()=>{
    try{
      console.log("Fetching article with slug:", slug);
      const data= await getArticle(slug)
      setArticle(data.article)
      setLoading(false)
    }catch(error){
     setError(error.message)
      setLoading(false)
    }
  }
  fetchArticle()
},[slug])

if (loading) {
  return <div style={{textAlign:'center',padding:'20px',fontSize:'20px'}}>Загрузка...</div>; 
}

if (error) {
  return <div style={{textAlign:'center',padding:'20px',fontSize:'20px'}}>Ошибка: {error}</div>; 
}

if (!article) {
  return <div style={{textAlign:'center',padding:'20px',fontSize:'20px'}}>Статья не найдена.</div>;
}


const { title, description, createdAt, author, body ,favoritesCount,tagList } = article

const formattedDate= DateTime.fromISO(createdAt).setLocale('en').toLocaleString(DateTime.DATE_MED)
  return (
    <article className={styles.article}>
    <div className={styles.article__content}>
            <div className={styles.article__left}>
                <div className={styles.article__titleSection}>
                    <h2 className={styles.article__title}>
                        {title}
                    </h2>
                    <button className={styles.article__likeBtn}>
                         {favoritesCount}
                    </button>
                </div>
                
                <div className={styles.article__tags}>
                {Array.isArray(tagList) ? tagList.map((tag, index) => (
                        <span key={index} className={styles.article__tag}>{tag}</span>
                    )) : (
                        <span className={styles.article__tag}>{tagList}</span>
                    )}
                </div>
                <p className={styles.article__description}>{description}</p>
            </div>
            
            
                <div className={styles.article__author}>
                  
                    <div className={styles.article__authorInfo}>
                        <span className={styles.article_nickname}>{author.username}</span>
                        <span className={styles.article__data}>{formattedDate}</span>
                    </div>
                    {author && 
                    <img className={styles.article__avatar} 
                    src={author.image || author.avatar} 
                    alt={author.username} />}
                </div>
            
        </div>
       
<div className={styles.content}>
        <Markdown>{body}</Markdown>
      </div>

    </article>
  );
}

export default Article; 