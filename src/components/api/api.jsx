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