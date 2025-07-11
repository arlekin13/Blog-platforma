import React ,{useState} from "react";
import styles from './LoginForm.module.scss'
import { Form, Input, Button,message} from 'antd'
import { loginUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';


function LoginForm(){

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const onFinish= async(value)=>{
  setIsLoading(true)
  setError(null)

  try{
    const response =await loginUser(value)
    localStorage.setItem('token', response.user.token);
    message.success('Вы успешно вошли! Сейчас перенаправим на главную страницу.');
      navigate('/');
  }catch (err) {
    setError(err.message || 'Ошибка входа. Проверьте email и пароль.');
    message.error(err.message || 'Ошибка входа. Проверьте email и пароль.');
    console.error('Login error:', err);
  } finally {
    setIsLoading(false);
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  message.error('Пожалуйста, заполните все поля корректно!');
};




    return(
<div className={styles.loginForm}>
<h2 className={styles.loginForm__title}> Sign In</h2>

<Form

  name="login"
  layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFieldsFailed={onFinishFailed}
      >

<Form.Item
name="email"

        label="Email address"
        rootClassName={styles.item}
        rules={[{ required: true, message: 'Please input your username!' }]}
      
    
      >
        <Input  
        style={{ width: '100%', height: '40px'  ,fontSize:'16px'}}
        placeholder='Email address' />
        
      </Form.Item>

      <Form.Item
      name="password"
        label="Password"
        rootClassName={styles.item}
        rules={[{ required: true, message: 'Please input your password!' }]}>
            
        <Input.Password 
        style={{ width: '100%', height: '40px'  ,fontSize:'16px'}}
        rootClassName={styles.item}
        placeholder='Password'  />
      </Form.Item>
      <Form.Item>

        <Button 
        style={{ width: '100%', height: '40px' ,fontSize:'16px',}} 
        type="primary" 
        htmlType="submit">
         Login
        </Button>
      </Form.Item>

        </Form>

</div>



// <form className={styles.loginForm}>
//     <h2> Sign In</h2>

   
//     <label className={styles.email__label} htmlFor="username">Email address</label>
//     <input  className={styles.email__input} type="text" id="username"/>

    
//     <label className={styles.password__label} htmlFor="password">Password</label>
//     <input  className={styles.password__input} type="password" id="password"/>

//     <button className={styles.button} type="submit">Login</button>


// </form> 
   )  
    
}

export default LoginForm