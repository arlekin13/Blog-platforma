import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { getArticle, editArticle } from '../api/api';
import ArticleForm from '../ArticleForm/ArticleForm';


function EditArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await getArticle(slug);
        setArticle(response.article);
      } catch (error) {
        message.error('Ошибка получения статьи');
        console.error('Ошибка получения статьи:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);


  const handleEditSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const updateArticle = {
        article: {
          ...values,
        },
      };
      await editArticle(slug, updateArticle);
      message.success('Статья обновлена');
      navigate(`/articles/${slug}`);
    } catch (error) {
      message.error('Ошибка обновления статьи');
      console.error('Ошибка обновления статьи', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!article) {
    return <div>Нет статьи</div>;
  }

  return (
    
      <ArticleForm
        initialValues={article}
        onSubmit={handleEditSubmit}
        isEdit={true}
        loading={isSubmitting}
      />
   
  );
}
export default EditArticlePage;
