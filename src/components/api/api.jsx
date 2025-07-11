import axios from 'axios'


const API_BASE_URL = 'https://blog-platform.kata.academy/api'

export const getArticles = async( page =1, limit = 5)=>{
    try{
        const response = await axios.get (`${API_BASE_URL}/articles?limit=${limit}&offset=${(page - 1) * limit}`)
        return response.data
    }catch(error){
        console.error('ошибка получения статей',error)
        throw error
    }
}

export const getArticle = async (slug)=>{
    
    try{
        const response=await axios.get (`${API_BASE_URL}/articles/${slug}`)
        const data = await response.data
        
        console.log("Fetch API Data:", data);
        return data
    }catch(error){
        console.error('Ошибка при получении статьи:', error);
        throw error
    }
}

export const registerUser= async( userData)=>{
    try{
        const response =await axios.post(`${API_BASE_URL}/users`,{user:userData})
 return response.data
        }catch(error){
            console.error('ошибка регист АПИ:', error);
            throw error
        }
    }


export const loginUser = async(credentials)=>{
    try{
        const response= await axios.post(`${API_BASE_URL}/users/login`, {
            user: { 
                email: credentials.email,
                password: credentials.password,
     } 
    })
        return response.data
    }catch(error){
        console.error('ошибка логин АПИ:', error);
        throw error
    }
}


export const getCurrentUser= async()=>{
    const token = localStorage.getItem('token')
    if(!token){
        throw new Error('нет токета')

    }
    try{
        const response=await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },}    )
      return response.data
    }catch(error){
        console.error('Ошибка при получении данных пользователя:', error);
        throw error;
    }
}