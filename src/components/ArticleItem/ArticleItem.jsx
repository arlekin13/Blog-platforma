import React from 'react';
import styles from './ArticleItem.module.scss'; 
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon'

function ArticleItem(
    { title, description, tags, slug, avatar, nickname, createdAt ,favoritesCount }){
        const formattedDate = DateTime.fromISO(createdAt).setLocale('en').toLocaleString(DateTime.DATE_MED);
  return (

    <li className={styles.articleItem}>
        <div className={styles.articleItem__content}>
            <div className={styles.articleItem__left}>
                <div className={styles.articleItem__titleSection}>
                    <h2 className={styles.articleItem__title}>
                    <Link to={`/articles/${slug}`}>{title}</Link>
                    </h2>                 
                    <button className={styles.articleItem__likeBtn}>
                         {favoritesCount}
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