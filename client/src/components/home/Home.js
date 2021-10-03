import React, {useState, useEffect, useCallback} from 'react';
import AddChallenge from './elements/AddChallenge';
import AllChallenges from './elements/AllChallenges';
import BaseModal from './../global/BaseModal';
import './Home.scss';
import axios from 'axios';
import { useHistory } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

function Home(){

 let history = useHistory();
 const [ideas, setIdeas] = useState([]);
 const [data, setData] = useState({});
 const [loader, setLoader] = useState(false);
 const [voting, setVoting] = useState(false);
 const [open, setOpen] = useState(false);
 const user = localStorage.getItem('user');
 
 useEffect(()=>{
    setLoader(true)
    axios({
      url:`${REACT_APP_API_URL}/ideas`,
      method:'GET'
    }).then(res =>{
      setIdeas((prev)=>([...prev,...res.data]))
    }).finally(()=>{
      setLoader(false)
    })
 },[])

 const updateIdeas = (newIdea) => {
   const ideaCheck = ideas.filter(c => c.id === newIdea.id);
   if(ideaCheck.length) {
     const balance = ideas.filter(c => c.id !== newIdea.id);
     setIdeas((prev)=>([...[newIdea],...balance]));
   }
   else {
     setIdeas((prev)=>([...prev,...[newIdea]]));
   }
   setOpen(false);
 };

 const onDelete = (id) => {
  setLoader(true)
  axios({
      url:`${REACT_APP_API_URL}/ideas/${id}`,
      method:'DELETE'
    }).then(res => {
      const afterDelete = ideas.filter(c=>c.id !== id)
      setIdeas(afterDelete);
    }).finally(()=>{
      setLoader(false)
    })
 }

 const onUpdate = (id) => {
   const option = ideas.filter(c=>c.id === id)[0];
   setOpen(true);
   setData((prev)=>({ ...prev, ...option }));
 };



 const newIdeas = () => {
   setData((prev)=>({ ...prev, ...{id:'', title: '', desc: '', tags: []} }));
   setOpen(true)
 }

 const vote = (id,isRecommend) =>{
   if(!voting) {
     setVoting(true)
     const d = [...ideas].filter(c=>c.id === id)[0];
     const user = localStorage.getItem('user');
     if(isRecommend && d.recommend.indexOf(user) === -1){
       d.recommend.push(user)
     }
     else if(isRecommend && d.recommend.indexOf(user) !== -1){
       d.recommend = d.recommend.filter(c=>c !== user);
     } 
     if(isRecommend && d.notRecommend.indexOf(user) !== -1){
        d.notRecommend = d.notRecommend.filter(c=>c !== user);
     }
     if(!isRecommend && d.notRecommend.indexOf(user) === -1){
        d.notRecommend.push(user)
     }
     else if(!isRecommend && d.notRecommend.indexOf(user) !== -1){
        d.notRecommend = d.notRecommend.filter(c=>c !== user);
     }
     if(!isRecommend && d.recommend.indexOf(user) !== -1){
        d.recommend = d.recommend.filter(c=>c !== user);
     }

     axios({
      url:`${process.env.REACT_APP_API_URL}/ideas/${d.id}`,
      method: 'PUT',
      data: d
    }).then(res => {
      if(res.data.id) {
        res.data.voting = '';
        res.data.devoting = '';
        updateIdeas(res.data)
      }
    }).finally(() =>{
      setVoting(false)
    })

    const selectedIdea = [...ideas].map(each=>{
       if(each.id === id){
         each.voting = isRecommend ? 'blink':''
         each.devoting = !isRecommend ? 'blink':''
       }
       return each
     })
     setIdeas(selectedIdea);


  }
 }

 const recommend = (id) => {
   vote(id,true)
 }

 const notRecommend = (id) => {
   vote(id, false)
 }

 const logOut = () =>{
   localStorage.setItem('user', '');
   history.push('/');
 }

 const closeAdd = (e)=>{
   e.preventDefault()
   setOpen(false)
 }


 return (
   <div>
    <div className="d-flex justify-content-end p-3">
      <button className="btn btn-success btn-sm me-2" onClick={newIdeas}>New Hack Idea</button>
      <b className="me-2">User: {user}</b>
      <a href="#" onClick={logOut}>Log Out  </a>
    </div>


    <BaseModal open={open}>
      <AddChallenge 
        updateIdeas={ updateIdeas } 
        data={ data } 
        close={(e)=>{closeAdd(e)}}
      />
    </BaseModal>

    <div className={`all-challenges-container ${loader?'loader ':''}`}>
    <AllChallenges 
       onDelete={ onDelete } 
       onUpdate= { onUpdate } 
       ideas={ ideas } 
       recommend={ recommend }
       notRecommend={ notRecommend }
    />
    </div>
   </div>
 )
}

export default Home;