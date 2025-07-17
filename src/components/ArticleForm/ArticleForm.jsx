import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './ArticleForm.module.scss';
import { createArticle } from '../api/api';
import { useNavigate } from 'react-router-dom';

function ArticleForm({ onArticleSubmit }) {
  const [tags, setTags] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (value) => {
    setIsLoading(true);
    try {
      const response = await createArticle({
        article: {
          ...value,
          tagList: tags.filter((tag) => tag.trim() !== ''),
        },
      });
      message.success('Статья создана!');
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      message.error('Ошибка при создании статьи');
      console.error('Ошибка при создании статьи:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e, index) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    if (tags.length > 0 && tags[tags.length - 1].trim() !== '') {
      setTags([...tags, '']);
    }
  };

  const handleDeleteTag = (index) => {
    if (tags.length > 1) {
      const newTags = tags.filter((_, i) => i !== index);
      setTags(newTags);
    } else {
      setTags(['']);
    }
  };

  return (
    <Form
      name="articleForm"
      onFinish={onFinish}
      layout="vertical"
      className={styles.form}
      hideRequiredMark
    >
      <h1 className={styles.title}> Create new article</h1>
      <Form.Item
        label={<span className={styles.label}>TITLE</span>}
        name="title"
        rules={[{ required: true, message: 'Введите заголовок статьи!' }]}
      >
        <Input className={styles.input} placeholder=" title" />
      </Form.Item>

      <Form.Item
        label={<span className={styles.label}>SHORT DESCRIPTION</span>}
        name="description"
        rules={[{ required: true, message: 'Введите краткое описание!' }]}
      >
        <Input className={styles.input} placeholder=" title" />
      </Form.Item>

      <Form.Item
        label={<span className={styles.label}>TEXT</span>}
        name="body"
        rules={[{ required: true, message: 'Введите текст' }]}
      >
        <Input.TextArea rows={7} className={styles.textArea} placeholder=" text" />
      </Form.Item>

      <div className={styles.tagsContainer}>
        <span className={styles.label}>TAGS</span>

        {tags.map((tag, index) => (
          <div className={styles.tagItem} key={index}>
            <Input
              type="text"
              size="small"
              style={{ width: 300 }}
              placeholder="Tag"
              value={tag}
              onChange={(e) => handleInputChange(e, index)}
              className={styles.input}
            />
            {tags.length > 1 && (
              <Button
                type="text"
                danger
                className={styles.deleteButton}
                onClick={() => handleDeleteTag(index)}
              >
                Delete
              </Button>
            )}
            {index === tags.length - 1 && (
              <Button
                type="primary"
                className={styles.addButton}
                onClick={handleAddTag}
                disabled={tag.trim() === ''}
              >
                Add tag
              </Button>
            )}
          </div>
        ))}
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className={styles.submitButton}
        >
          SEND
        </Button>
      </Form.Item>
    </Form>
  );
}
export default ArticleForm;
