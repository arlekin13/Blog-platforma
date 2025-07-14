import React, { useState } from "react";
import {Form,Input,Button,message,Tag} from 'antd'
import styles from './ArticleForm.module.scss'
import {createArticle} from '../api/api'


function ArticleForm({onArticleSubmit}){

const [tags,setTags]= useState([])
const [inputValue,setInputValue]= useState('')
const [isLoading,setIsLoading]= useState(false)

const onFinish =async(value)=>{
    setIsLoading(true)
    try{
        const response=await createArticle({
            article:{
                ...value,
                tagList: tags,
            }
        })
        message.success('Статья создана!')
        onArticleSubmit(response.article.slug)
    }catch(error){
        message.error('Ошибка при создании статьи')
        console.error('Ошибка при создании статьи:', error)
    }finally{
        setIsLoading(false)
    }
}
const handleInputChange = (e)=>{
    setInputValue(e.target.value)
}

const handleInputConfirm=()=>{
    if( inputValue && tags.indexOf(inputValue)===-1){
        setTags([...tags,inputValue])
}
setInputValue('')
}

const handleTagClose=(removeTag)=>{
    const newTag=Tag.filter((tag)=>tag!==removeTag)
    setTimeout(newTag)
}
return(
    <Form
    name="articleForm"
    onFinish={onFinish}
    layout="vertical"
    className={styles.form}
    >

        <Form.Item
        label='TITLE'
        name='title'
        rules={[{ required: true, message: 'Введите заголовок статьи!' }]}>
            <Input placeholder=" title"/>
        </Form.Item>

        <Form.Item
        label='SHORT DESCRIPTION'
        name='description'
        rules={[{ required: true, message: 'Введите краткое описание!' }]}>
            <Input placeholder=" title"/>
        </Form.Item>

        <Form.Item
        label='TEXT'
        name='body'
        rules={[{ required: true, message: 'Введите текст' }]}>
            <Input.TextArea rows={4} placeholder=" text"/>
        </Form.Item>

        <div>
            {tags.map((tag)=>(
                <Tag key={tag} closable onClose={()=> handleTagClose(tag)}>
                    {tag}
                </Tag>
            ))}
            <Input
            type="text"
            size="small"
            style={{width:300}}
            placeholder="Tag"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            />
        </div>

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>SEND</Button>
            
        </Form.Item>

    </Form>
)
}
export default ArticleForm