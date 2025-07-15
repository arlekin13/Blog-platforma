import React from "react";
import {useNavigate} from 'react-router-dom'
import ArticleForm from '../../components/ArticleForm/ArticleForm'

function NewArticlePage(){
    const navigate= useNavigate()
    
    const handleArticleCreated =(slug)=>{
        navigate(`/articles/${slug}`)
    }

    return(

      
        
        <ArticleForm
        onArticleSubmit = {handleArticleCreated}/>
      
    )
}
export default NewArticlePage