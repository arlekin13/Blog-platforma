import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './ArticleForm.module.scss';


function ArticleForm({ initialValues = {}, onSubmit, isEdit = false, loading = false }) {
  const [form] = Form.useForm();

  const [tags, setTags] = useState(initialValues.tagList && initialValues.tagList.length > 0 ? initialValues.tagList : ['']);

  // useEffect теперь обновляет поля только если initialValues не пустой (например, для редактирования)
  useEffect(() => {
    const hasInitial = initialValues && (
      initialValues.title || initialValues.description || initialValues.body || (initialValues.tagList && initialValues.tagList.length > 0)
    );
    if (hasInitial) {
      form.setFieldsValue({
        title: initialValues.title || '',
        description: initialValues.description || '',
        body: initialValues.body || '',
      });
      setTags(initialValues.tagList && initialValues.tagList.length > 0 ? initialValues.tagList : ['']);
    }
    // если initialValues пустой (создание) — ничего не делаем, пользователь может вводить значения
  }, [initialValues, form]);

  // Обработка отправки формы
  const onFinish = (values) => {
    // Передаём значения формы и теги наверх
    onSubmit({ ...values, tagList: tags.filter((tag) => tag.trim() !== '') });
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
      form={form}
      name="articleForm"
      onFinish={onFinish}
      layout="vertical"
      className={styles.form}
      hideRequiredMark
    >
      <h1 className={styles.title}>{isEdit ? 'Edit article' : 'Create new article'}</h1>
      <Form.Item
        label={<span className={styles.label}>TITLE</span>}
        name="title"
        rules={[{ required: true, message: 'Введите заголовок статьи!' }]}
      >
        <Input className={styles.input} placeholder="Заголовок" />
      </Form.Item>
      <Form.Item
        label={<span className={styles.label}>SHORT DESCRIPTION</span>}
        name="description"
        rules={[{ required: true, message: 'Введите краткое описание!' }]}
      >
        <Input className={styles.input} placeholder="Краткое описание" />
      </Form.Item>
      <Form.Item
        label={<span className={styles.label}>TEXT</span>}
        name="body"
        rules={[{ required: true, message: 'Введите текст' }]}
      >
        <Input.TextArea rows={7} className={styles.textArea} placeholder="Текст статьи" />
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
          loading={loading}
          className={styles.submitButton}
        >
          {isEdit ? 'SAVE' : 'SEND'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ArticleForm;
