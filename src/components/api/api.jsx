import axios from 'axios'


const API_BASE_URL = 'https://blog-platform.kata.academy/api'
const getToken = () => {
    return localStorage.getItem('token');
}

const authHeader = () => {
    const tokenValue = getToken();
    return tokenValue ? { Authorization: `Token ${tokenValue}` } : {};
}

export const getArticles = async (page = 1, limit = 5, token) => {
    try {
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const response = await axios.get(
            `${API_BASE_URL}/articles?limit=${limit}&offset=${(page - 1) * limit}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('ошибка получения статей', error);
        throw error;
    }
};

export const getArticle = async (slug) => {
    const tokenValue = getToken();
    const headers = tokenValue ? { Authorization: `Token ${tokenValue}` } : {};
    try {
        const response = await axios.get(
            `${API_BASE_URL}/articles/${slug}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении статьи:', error);
        throw error;
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
        if(error.response && error.response.data && error.response.data.error)
        {
            throw new Error(JSON.stringify(error.response.data.errors ))
        }else{
            throw new Error(error.message || 'Login failed');
        }
       
    }
}


export const getCurrentUser= async()=>{
const tokenValue=getToken()
    if(!tokenValue){
        throw new Error('нет токета')

    }
    try{
        const response=await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Token ${tokenValue}`,
      },}    )
      return response.data
    }catch(error){
        console.error('Ошибка при получении данных пользователя:', error);
        throw error;
    }
}


export const createArticle = async(articleData)=>{
    
   
    try{
        const response= await axios.post(`${API_BASE_URL}/articles`, articleData, {
      headers: authHeader(),
      
    })
    return response.data
    }catch(error){
        console.error('ошибка создания статьи', error)
        throw error
    }
}

export const deleteArticle = async(slug)=>{
    try{
        const response= await axios.delete(`${API_BASE_URL}/articles/${slug}`, {
      headers: authHeader(),})
      return response.data
    }catch(error){
        throw error
    }
}

export const editArticle=async(slug,articleData)=>{
    try{
        const response= await axios.put(`${API_BASE_URL}/articles/${slug}`, articleData, {
            headers:authHeader()
        })
        return response.data
    }catch(error){
        console.error('Ошибка при редактировании статьи', error);
        throw error
      }  }
    

      export const likeArticle= async(slug)=>{
        const tokenValue=getToken()
        if(!tokenValue){
            throw new Error('net tokena')
        }
        try{
            const response =await axios.post(
                `${API_BASE_URL}/articles/${slug}/favorite`, {}, {
            headers: authHeader() ,})
        
        
        return response.data
        
      }catch(error){
        throw error
      }
    }

    export const unlikeArticle = async (slug) => {
        const tokenValue = getToken();
        if (!tokenValue) {
            throw new Error('net tokena');
        }
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/articles/${slug}/favorite`,
                { headers: authHeader() }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    export const getArticleBySlug = async (slug, token) => {
        try {
            const response = await axios.get(
                `https://blog-platform.kata.academy/api/articles/${slug}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            return response.data.article;
        } catch (error) {
            console.error('Ошибка при получении статьи по slug:', error);
            return null; //
        }
    };