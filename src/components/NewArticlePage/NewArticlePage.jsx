import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { createArticle } from '../api/api';
import { message } from 'antd';


function NewArticlePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleCreateSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await createArticle({ article: values });
      message.success('Статья создана!');
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      message.error('Ошибка при создании статьи');
      console.error('Ошибка при создании статьи:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ArticleForm
      onSubmit={handleCreateSubmit}
      isEdit={false}
      loading={isSubmitting}
    />
  );
}
export default NewArticlePage;
