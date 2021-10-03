import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import { useForm } from "react-hook-form";
import './../Home.scss';
import axios from 'axios';
const { REACT_APP_API_URL } = process.env;



function AddChallenge({updateIdeas, data, close}) {
 
 const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ name: 'title'});
 const [tags, setTags] = useState([]);
 const [idea, setIdea] = useState({ title: '', desc: '', tags: [], createdBy: '', createdOn: '', recommend:[], notRecommend:[] });
 const [loading, setLoading] = useState(false)


 const handleChange = (val) =>{
   setIdea((prev) => ({...prev, ...{ tags: val } }))
 }

 const addIdea = () => {
  if(!loading) {
    setLoading(true)
    const d = {...idea, ...{createdBy: localStorage.getItem('user'), createdOn:new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date())}}
    axios({
    	url:`${REACT_APP_API_URL}/ideas`,
    	method: 'POST',
    	data: d
    }).then(res => {
    	if(res.data.id) {
    		updateIdeas(res.data)
    	}
    }).finally(()=>{
      setLoading(false)
    })
  }
 }

 const updateIdea = () => {
  if(!loading) {
    setLoading(true)
  const d = {...idea, ...{createdBy: localStorage.getItem('user'), createdOn:new Date().toDateString()}}
  axios({
    url:`${REACT_APP_API_URL}/ideas/${data.id}`,
    method: 'PUT',
    data: d
  }).then(res => {
    if(res.data.id) {
      updateIdeas(res.data)
    }
  }).finally(()=>{
    setLoading(false)
  })
}
 }


 const clear = (e) => {
  e.preventDefault();
 	setIdea({id:'', title:'',desc:'',tags: []});
 }


 useEffect(()=>{
   setIdea((prev)=>({...prev,...data}));
   setValue("title", data.title)
   setValue("desc", data.desc)
 },[data])

 useEffect(()=>{
  axios({
    url:`${REACT_APP_API_URL}/tags`,
    method: 'GET',
    data:idea
  }).then(res => {
    if(res.data) {
      setTags(res.data)
    }
  })
 },[])

 return(
	<div className="add-challenge card">
    {/* header section */}
    <form onSubmit={ handleSubmit(data.id ? updateIdea : addIdea) } >
    <div className="card-header">
      <h4>
        Hack Ideas 
        <button 
          className="float-end border-0 bg-white" 
          onClick={(e)=>{close(e)}}>X
        </button>
      </h4>
    </div>

    {/* body section */}
	  <div className="card-body">
	      <div className="mb-3">
          <label className="form-label">Title</label>
	        <input 
            type="text" 
            placeholder="Title" 
            className={`form-control ${errors.title && 'is-invalid'}`} 
            {...register('title', { required: true })} 
            value={idea.title} 
            onChange={(e)=>setIdea((prev)=>({...prev, ...{title:e.target.value}}))}
           />
           { errors.title && <span className="text-danger">Title  is required</span> }
	      </div>
	      <div className="mb-3">
          <label className="form-label">Description</label>
	        <textarea 
           placeholder="Description" 
           className={`form-control ${errors.desc && 'is-invalid'}`} 
           {...register('desc', { required: true })} 
           value={idea.desc} 
           onChange={(e)=>setIdea((prev)=>({...prev, ...{desc:e.target.value}}))}>
          </textarea>
          { errors.desc && <span className="text-danger">Description is required</span> }
	      </div>
	      <div className="mb-3">
           <label className="form-label">Tags</label>
	         <Select 
             value={idea.tags} 
             options={tags}  
             isMulti 
             onChange={handleChange}
           />
	      </div>
	  </div>

    {/* footer section */}
    <div className="card-footer d-flex justify-content-end">
        <button className="btn btn-success">{loading ? 'Please Wait...': (data.id ? 'Update' : 'Add') }</button>
        <button className="btn btn-danger ms-2" onClick={ (e) => clear(e) }>Clear</button>
    </div>
    </form>
	</div>
 )
}

export default AddChallenge;