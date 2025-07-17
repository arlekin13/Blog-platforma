import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';

import { Form, Input, Button, message } from 'antd';
import { getCurrentUser, profileEdit } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getCurrentUser(token);
        const userData = data.user;
        console.log('data', userData);
        setInitialValues(userData);
        form.setFieldsValue({
          username: userData.username,
          email: userData.email,
          image: userData.image,
          bio: userData.bio,
        });
      } catch (error) {
        message.error('не загрузились данные профиля');
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    } else {
      navigate('/sign-in');
    }
  }, [token, navigate, form]);

  const onFinish = async (value) => {
    setLoading(true);
    try {
      await profileEdit(value);
      message.success('Профиль обновлен');
    } catch (error) {
      message.error('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Ошибка валидации формы');
  };

  return (
    <Form
      form={form}
      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
      name="profile"
      layout="vertical"
      className={styles.profilePageContainer}
      autoComplete="off"
      hideRequiredMark
    >
      <h2 className={styles.title}> Edit profile</h2>
      <Form.Item
        label="Username"
        name="username"
        rootClassName={styles.label}
        rules={[{ required: true, message: 'Введите имя пользователя' }]}
      >
        <Input rootClassName={styles.input} />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email address"
        rootClassName={styles.label}
        rules={[
          { required: true, message: 'Пожалуйста, введите ваш email!' },
          { type: 'email', message: 'Пожалуйста, введите корректный email!' },
        ]}
      >
        <Input rootClassName={styles.input} placeholder="Email address" />
      </Form.Item>

      <Form.Item name="password" label="New password" rootClassName={styles.label}>
        <Input rootClassName={styles.input} placeholder="New password" />
      </Form.Item>

      <Form.Item label="Avatar image (url)" name="image" rootClassName={styles.label}>
        <Input rootClassName={styles.input} placeholder="Avatar image" />
      </Form.Item>

      <Form.Item>
        <Button rootClassName={styles.save} type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
export default ProfilePage;
