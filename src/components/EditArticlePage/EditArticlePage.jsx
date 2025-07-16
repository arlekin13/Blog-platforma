import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import{Form,Input,Button,message} from 'antd'
import styles from './EditArticlePage.module.scss'
import { getArticle, editArticle } from '../api/api';


function EditArticlePage(){

    const {slug}=useParams()
    const [article,setArticle]=useState(null)
    const [loading,setLoading]=useState(true)
    const [form]=Form.useForm()
    const [isSubmitting,setIsSubmitting]=useState(false)
    const navigate=useNavigate()
    const[tags,setTags]= useState([''])

    useEffect(()=>{
        const fetchArticle=async()=>{
            setLoading(true)
            try{
                const response= await getArticle(slug)
                setArticle(response.article)
                if(response.article){
                    form.setFieldsValue({ 
                        title: response.article.title,
                        description: response.article.description,
                        body: response.article.body,
                      });
                    setTags(response.article.tagList|| [''])
                }
            }catch(error){
                message.error('ошибка получения статьи'); 
        console.error('ошибка получения статьи:', error);
      } finally {
        setLoading(false);
      }}
      fetchArticle()
    },[slug,form])

    const onFinish = async(value)=>{
        setIsSubmitting(true)
        try{
            const updateArticle={
                article:{
                    ...value,
                    tagList: tags.filter(tag=>tag.trim() !=='')
                }
            }
            await editArticle(slug,updateArticle)
            message.success('Статья обновлена')
            navigate(`/articles/${slug}`)
        }catch(error){message.error('ошибка обновы статьи');
            console.error('ошибка обновы статьи', error);
        } finally {
            setIsSubmitting(false);
        }
    }

const handleAddTag=()=>{
    if(tags.length>0 &&tags[tags.length-1].trim()!==''){
        setTags([...tags,''])
    }
}
const handleInputChange=(e,index)=>{
    const newTags=[...tags]
    newTags[index]=e.target.value
    setTags(newTags)
}

const handleDeleteTag=(index)=>{
    if(tags.length>1){
        const newTags = tags.filter((_, i) => i !== index)
        setTags(newTags)
            }else{
                setTags([''])
            }
}

if(loading){
    return <div> Загрузка...</div>
}
if(!article){
    return<div>Нет статьи</div>
}

return(
    <Form
    form={form}
    name="articleForm"
   onFinish={onFinish}
    layout="vertical"
    className={styles.form}
    hideRequiredMark
    >
<h1 className={styles.title}> Edit article</h1>
        <Form.Item
        label={<span className={styles.label}>TITLE</span>}
        name='title'
        rules={[{ required: true, message: 'Введите заголовок статьи!' }]}>
            <Input className={styles.input} placeholder=" Title"/>
        </Form.Item>

        <Form.Item
        label={<span className={styles.label}>SHORT DESCRIPTION</span>}
        name='description'
        rules={[{ required: true, message: 'Введите краткое описание!' }]}>
            <Input className={styles.input}  placeholder=" Description"/>
        </Form.Item>

        <Form.Item
        label={<span className={styles.label}>TEXT</span>}
        name='body'
        rules={[{ required: true, message: 'Введите текст' }]}>
            <Input.TextArea rows={7}
            className={styles.textArea}
             placeholder=" text"/>
        </Form.Item>


 <div className={styles.tagsContainer}>
              <span className={styles.label}>TAGS</span>
              {tags.map((tag, index) => (
                  <div className={styles.tagItem} key={index}>
                      <Input
                          type="text"
                          size="small"
                          style={{ width: 300 }}
                          placeholder="Tag"
                          value={tag}
                          onChange={(e)=>handleInputChange(e,index)}
                          className={styles.input}
                      />
                      {tags.length > 1 && (
                          <Button
                              type="text"
                              danger
                              className={styles.deleteButton}
                             onClick={()=>handleDeleteTag(index)}
                          >
                              Delete
                          </Button>
                      )}
                      {index === tags.length - 1 && (
                          <Button
                              type="primary"
                              className={styles.addButton}
                             onClick={handleAddTag}
                              disabled={tag.trim() === ''}
                          >
                              Add tag
                          </Button>
                      )}
                  </div>
              ))}
          </div>
          <Form.Item>
            <Button
             type="primary"
              htmlType="submit" 
            loading={isSubmitting}
              className={styles.submitButton}>SEND</Button>
            
        </Form.Item>
        </Form>
)

}
export default EditArticlePage