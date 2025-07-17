import React, { useState, useEffect } from 'react';
import styles from './ArticleList.module.scss';
import ArticleItem from '../ArticleItem/ArticleItem';
import { getArticles, getArticleBySlug } from '../api/api';
import { Pagination } from 'antd';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 5;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticles = async (page) => {
      try {
        const data = await getArticles(page, limit, token);
        const updatedArticles = data.articles.map((article) => ({
          ...article,
          favoritesCount: Number(article.favoritesCount) || 0,
        }));
        setArticles(updatedArticles);
        setTotalPage(Math.ceil(data.articlesCount / limit));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchArticles(currentPage);
  }, [currentPage, limit, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateArticle = async (slug) => {
    if (!token) return;

    try {
      const updatedArticleData = await getArticleBySlug(slug, token);
      if (updatedArticleData) {
        setArticles((prevArticles) =>
          prevArticles.map((article) => {
            if (article.slug === slug) {
              return {
                ...article,
                favorited: updatedArticleData.favorited,
                favoritesCount: updatedArticleData.favoritesCount,
              };
            }
            return article;
          })
        );
      }
    } catch (error) {
      console.error('Ошибка при обновлении статьи:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px' }}>Идёт загрузка...</div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px' }}>
        Ошибка : {error.message}
      </div>
    );
  }

  console.log('articles', articles);

  return (
    <div className={styles.articleList}>
      <ul className={styles.articleList__content}>
        {articles.map((article) => (
          <ArticleItem
            key={article.slug}
            title={article.title}
            description={article.description}
            createdAt={article.createdAt}
            author={article.author}
            tags={article.tagList}
            slug={article.slug}
            avatar={article.author.image}
            nickname={article.author.username}
            favoritesCount={article.favoritesCount}
            favorited={article.favorited}
            token={token}
            article={article}
            onArticleUpdate={updateArticle}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
        <Pagination
          current={currentPage}
          total={totalPage * limit}
          pageSize={limit}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ArticleList;
