import React , { useState } from "react";
import { Form, Input, Button,Checkbox,message  } from 'antd'
import { Link} from 'react-router-dom'
import styles from './RegisterForm.module.scss'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/api'


function RegisterForm(){
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  
  const [form]=Form.useForm()
const navigate =useNavigate()

const onFinish= async(value)=>{
  setIsLoading(true)
  setError(null)

  try{
    const userData={
      username: value.username,
      email: value.email,
      password: value.password,
    }
    const response = await registerUser(userData)
    localStorage.setItem('token',response.user.token)

   
    message.success('Зарегестрирован! Залогинься');
    form.resetFields();
    navigate('/login');
  }catch(error){
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = error.response.data.errors;
      Object.keys(errorMessages).forEach((field) => {
        message.error(`${field}: ${errorMessages[field].join(', ')}`);
      });
      setError('Ошибка валидации. Исправьте поля.');
    } else {
      setError(error.message || 'Ошибка регистрации. Проверьте всё и попробуйте снова!');
      message.error(error.message || 'Ошибка регистрации. Проверьте всё и попробуйте снова!');
    }
    console.error('Рег ошибка:', error);
  }finally{
    setIsLoading(false)
  }
}

const onFinishFailed = (errorInfo) => {
  console.log('Провал:', errorInfo);
  message.error('Корректно всё заполни!'); 
};




    return(
        <div className={styles.registerForm}>
        <h2 className={styles.registerForm__title}> Sign Up</h2>
        
        <Form 
       form={form}
        name="register" 
        layout="vertical" 
        requiredMark={false} 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
          autoComplete="off"
      >
         
         <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 3, message: 'Username must be at least 3 characters' },
            { max: 20, message: 'Username must be at most 20 characters' },
            { value: /^[a-z][a-z0-9]*$/,message: 'You can only use lowercase English letters and numbers',
              }
          ]}
          rootClassName={styles.item}
        >
          <Input 
          placeholder="Username" 
          style={{ width: '319px', height: '40px'  ,fontSize:'16px'}} />
          
        </Form.Item> 
        
        <Form.Item
          name="email"
                label="Email address"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
                rootClassName={styles.item}
            
              >
                <Input  
                style={{ width: '319px', height: '40px'  ,fontSize:'16px'}}
                placeholder='Email address' />
              </Form.Item>
        
              <Form.Item
              name="password"
                label="Password"
                rootClassName={styles.item}
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                  { max: 40, message: 'Password must be at most 40 characters' },
                ]}
                >    
                <Input.Password 
                style={{ width: '319px', height: '40px'  ,fontSize:'16px'}}
                placeholder='Password'  />
              </Form.Item>

              <Form.Item
          name="confirmPassword"
          label="Repeat Password"
          dependencies={['password']}
          rootClassName={styles.item}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords do not match'))
              },
            }),
          ]}
        >
  <Input.Password 
  placeholder="Repeat Password" 
  style={{ width: '319px', height: '40px'  ,fontSize:'16px'}}
   />
  </Form.Item>

  <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')),
            },
          ]}
          rootClassName={styles['checkbox-box']}
        >
          <Checkbox 
          rootClassName={styles['checkbox-agree']}>
            I agree to the processing of my personal information
          </Checkbox>

          </Form.Item>

              <Form.Item>
        
                <Button 
                style={{ width: '319px', height: '40px' ,fontSize:'16px'}} 
                type="primary" 
                htmlType="submit">
                 Login
                </Button>
              </Form.Item>
        
              <span className={styles['login-link']}>
          Already have an account?
          <Link to="/login" className={styles['login']}>
            {' '}
            Sign In.
          </Link>
        </span>

                </Form>
        
        </div>
        
    )
}
export default RegisterForm