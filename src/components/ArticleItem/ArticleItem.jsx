import React, { useState,useEffect } from 'react';
import styles from './ArticleItem.module.scss'; 
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon'
import axios from 'axios'

function ArticleItem(
    { title, description, tags, slug, avatar, nickname, createdAt ,favoritesCount ,favorited,article,onArticleUpdate}){
        const formattedDate = DateTime.fromISO(createdAt).setLocale('en').toLocaleString(DateTime.DATE_MED);

        const [isFavorited, setIsFavorited] = useState(favorited);
        const [likesCount, setLikesCount] = useState(Number(favoritesCount) || 0)
        const [token,setToken]=useState(null)

          console.log("ArticleItem: token =", token, "article =", article);


          useEffect(()=>{
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
          }, []);

          useEffect(()=>{
            setIsFavorited(favorited)
            setLikesCount(Number(favoritesCount) || 0);
        }, [favoritesCount, favorited])
          

          const handleLikeClick = async () => {
            if (!token) {
                console.log("Токен отсутствует. Лайк не будет выполнен.");
                return;
            } 
    
            try {
              if (isFavorited) {
                console.log("Удаляем лайк...");
                await axios.delete(
                  `https://blog-platform.kata.academy/api/articles/${article.slug}/favorite`,
                  {
                    headers: { Authorization: `Token ${token}` },
                  },
                );
                setLikesCount((prev) =>  (Number(prev) - 1) || 0);
              } else {
                console.log("Ставим лайк...");
                await axios.post(
                  `https://blog-platform.kata.academy/api/articles/${article.slug}/favorite`,
                  {},
                  {
                    headers: { Authorization: `Token ${token}` },
                  },
                );
                setLikesCount((prev) =>  (Number(prev) + 1) || 0);
              }
              setIsFavorited(!isFavorited);
              
              if (onArticleUpdate) {
                onArticleUpdate(slug);
            }
            } catch (error) {
              console.error("Ошибка при попытке лайкнуть статью:", error);
            }
          };

         
           

        const buttonClass = isFavorited 
        ? styles.articleItem__redLikeBtn 
        : styles.articleItem__likeBtn;
  return (

    <li className={styles.articleItem}>
        <div className={styles.articleItem__content}>
            <div className={styles.articleItem__left}>
                <div className={styles.articleItem__titleSection}>
                    <h2 className={styles.articleItem__title}>
                    <Link to={`/articles/${slug}`}>{title}</Link>
                    </h2>                 
                    <button 
                    className={buttonClass}
                    onClick={handleLikeClick}>
                       
                       {likesCount}
                    </button>
                </div>
                
                <div className={styles.articleItem__tags}>
                    {Array.isArray(tags) ? tags.map((tag, index) => (
                        <span key={index} className={styles.articleItem__tag}>{tag}</span>
                    )) : (
                        <span className={styles.articleItem__tag}>{tags}</span>
                    )}
                </div>
                
                <p className={styles.articleItem__description}>{description}</p>
            </div>
            
            
                <div className={styles.articleItem__author}>
                  
                    <div className={styles.articleItem__authorInfo}>
                        <span className={styles.articleItem__nickname}>{nickname}</span>
                        <span className={styles.articleItem__data}>{formattedDate}</span>
                    </div>
                    <img className={styles.articleItem__avatar} src={avatar} alt={nickname} />
                </div>
            
        </div>
    </li>
  );
}

export default ArticleItem;