import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import { Form, Input, Button, message } from 'antd';
import { loginUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (value) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(value);
      localStorage.setItem('token', response.user.token);
      message.success('Вы успешно вошли! Сейчас перенаправим на главную страницу.');
      navigate('/');
    } catch (err) {
      let errorMessage = 'Ошибка входа. Проверьте email и пароль.';

      try {
        const errors = JSON.parse(err.message);

        if (typeof errors === 'object' && errors !== null) {
          errorMessage = Object.entries(errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        }
      } catch (parseError) {
        console.error(err.message);
      }
      setError(errorMessage);
      message.error(errorMessage);
      console.error('Ошибка в логине:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error('Пожалуйста, заполните все поля корректно!');
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.loginForm__title}> Sign In</h2>

      <Form
        name="login"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFieldsFailed={onFinishFailed}
        hideRequiredMark
      >
        <Form.Item
          name="email"
          label="Email address"
          rootClassName={styles.item}
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
            { type: 'email', message: 'Пожалуйста, введите корректный email!' },
          ]}
        >
          <Input
            style={{ width: '100%', height: '40px', fontSize: '16px' }}
            placeholder="Email address"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rootClassName={styles.item}
          rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
        >
          <Input.Password
            style={{ width: '100%', height: '40px', fontSize: '16px' }}
            rootClassName={styles.item}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: '100%', height: '40px', fontSize: '16px' }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Login
          </Button>
          {error && <div>{error}</div>}
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
