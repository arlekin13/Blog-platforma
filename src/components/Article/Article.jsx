import React,{useState,useEffect}from 'react';
import styles from './Article.module.scss';
import{useParams,useNavigate} from 'react-router-dom'
import{DateTime} from 'luxon'
import{getArticle,deleteArticle,getCurrentUser} from '../api/api'
import Markdown from 'markdown-to-jsx'
import{Button, message} from 'antd'

function Article() {
 

const {slug}=useParams()
const [article,setArticle]=useState(null)
const[loading,setLoading]=useState(true)
const[error,setError]=useState(null)
const [currentUser, setCurrentUser] = useState(null)
const navigate= useNavigate()


useEffect(()=>{

  const fetchArticle=async()=>{
    try{
      const data= await getArticle(slug)
      setArticle(data.article)
      setLoading(false)
    }catch(error){
     setError(error.message)
      setLoading(false)
    }
  }
  const fetchCurrentUser=async()=>{
    try{
      const user =await getCurrentUser()
      setCurrentUser(user)
    }catch(error){
      console.error(error)
    }
  }
  Promise.all([fetchArticle(), fetchCurrentUser()]);
},[slug])
console.log("Current User:", currentUser);
console.log("Article:", article);
const handleDelete=async()=>{
  try{
    await deleteArticle(slug)
    message.success('Статья удалена!')
    navigate('/')
  }catch(error){
    message.error('не удалось удалить статью')
    console.error(error)
  }
}

const handleEdit=()=>{
  navigate(`/articles/${slug}/edit`)
}

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
const isAuthor= currentUser && article?.author?.username === currentUser?.user?.username

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
                                  
<div className={styles.content}>
        <Markdown>{body}</Markdown>
      </div>
</div>
<div>
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
              {isAuthor && (
                  <>
                        <div className={styles.article__actions}>
                        <Button  
                        danger  
                        onClick={handleDelete} 
                        className={styles.deleteButton}>Delete</Button>

                        <Button 
                        type="primary"  
                        onClick={handleEdit} 
                        className={styles.editButton} >Edit</Button>
                        </div>             
                  </>)}

</div>
           

                
            </div>
    </article>
  );
}

export default Article; 