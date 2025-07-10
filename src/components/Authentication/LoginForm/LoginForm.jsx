import React  from "react";
import styles from './LoginForm.module.scss'
import { Form, Input, Button,} from 'antd'






function LoginForm(){


    return(
<div className={styles.loginForm}>
<h2 className={styles.loginForm__title}> Sign In</h2>

<Form

  name="login"
  layout="vertical"
        autoComplete="off"
        
      >

<Form.Item
        label="Email address"
        rootClassName={styles.item}
        rules={[{ required: true, message: 'Please input your username!' }]}
      
    
      >
        <Input  
        style={{ width: '100%', height: '40px'  ,fontSize:'16px'}}
        placeholder='Email address' />
      </Form.Item>

      <Form.Item
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