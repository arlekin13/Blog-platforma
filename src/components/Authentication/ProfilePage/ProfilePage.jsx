import React from "react";
import styles from './ProfilePage.module.scss'

import { Form, Input, Button,message} from 'antd'

import { useNavigate } from 'react-router-dom';

function ProfilePage( ){
    return(

<Form

  name="login"
  layout="vertical"
  className={styles.profilePageContainer}
        autoComplete="off"
        hideRequiredMark
      >
        <h2 className={styles.loginForm__title}> Sign In</h2>
 <Form.Item 
 label="Username" 
 name="username" 
 rootClassName={styles.label}
 rules={[{ required: true, message: "Введите имя пользователя" }]}>
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
        <Input  
        rootClassName={styles.input}
        placeholder='Email address' />
        
      </Form.Item>

      <Form.Item
       name="password"
        label="New password"
        rootClassName={styles.label}
        rules={[
          { required: true, message: 'Пожалуйста, введите ваш пароль!' }
          ]}>
            
            <Input  
        rootClassName={styles.input}
        placeholder='New password' />

      </Form.Item>

      <Form.Item 
      label="Avatar image (url)" 
      name="image"
      rootClassName={styles.label}>
          <Input
           rootClassName={styles.input}
          placeholder="Avatar image" />
        </Form.Item>
      
      <Form.Item>

        <Button 
       
        type="primary" 
        htmlType="submit"
        >
         Save
        </Button>
       
      </Form.Item>

        </Form>

    

        
    )
}
export default ProfilePage