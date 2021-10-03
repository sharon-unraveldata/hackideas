import React, { useState } from 'react';
import Tags from './Tags'
import Nodata from './../../global/Nodata';


function AllChallenges(props) {

 let ideas = <Nodata message="Hack Ideas Not Available"/>
 const user = localStorage.getItem('user');
 const [sorts, setSorts] = useState({key: 'id',val:1})

 const doSort = (key) => {
   setSorts({key:key,val:sorts.val*-1});
 }

 const tableHeads = [
  {key:'title', label:'Title'},
  {key:'desc', label:'Desc'},
  {key:'tags', label:'Tags'},
  {key:'createdBy', label:'created By'},
  {key:'createdOn', label:'created On'}
 ]

 if(props.ideas.length) {

	 ideas =  props.ideas.sort((a,b)=>a[sorts.key] > b[sorts.key] ? 1*sorts.val: -1*sorts.val).map((each,index)=>{ 
		 return (
			  <tr key={index}>
			    <td>{each.title}</td>
			    <td className="desc">{each.desc}</td>
			    <td className="tags">
			      {
			        each.tags.map((tag,i)=> <Tags id={each.id+i} key={i} tag={tag}/>)
			      }
			    </td>
			    <td>{each.createdBy}</td>
			    <td>{each.createdOn}</td>
			    <td className="action">
			      <button className={`bi bi-pencil-square border-0 ${each.createdBy !== user ? 'disabled' : ''}`} onClick={() =>props.onUpdate(each.id)}></button>
			      <button className={`bi bi-trash border-0 ${each.createdBy !== user ? 'disabled' : ''}`} onClick={() =>props.onDelete(each.id)}></button>
			      <button className={`bi bi-hand-thumbs-up border-0 ${each.createdBy === user ? 'disabled' : ''} ${each.voting}`} onClick={() =>props.recommend(each.id)}></button>{each.recommend.length}
			      <button className={`bi bi-hand-thumbs-down border-0 ${each.createdBy === user ? 'disabled' : ''} ${each.devoting}`} onClick={() =>props.notRecommend(each.id)}></button>{each.notRecommend.length}
			    </td>
			  </tr>
		  )
	 });
 }


 return(
 	<div className="all-challenges card">
		<div className="card-header">
		  All Hack Ideas
		</div>

		<div className="card-body">
		  <table className="table table-striped">
		    <thead  className="table-light">
		      <tr>
		        {
		        	tableHeads.map((each,index) =>{
		        		return <th key={`th-${index}`} onClick={()=>doSort(each.key)}>{each.label} <i className={`fa fa-fw ${sorts.key === each.key ?(sorts.val > 0 ? 'fa-sort-asc' : 'fa-sort-desc'):'fa-sort'}`}></i></th>
		        	})
		        }
		        <th>Actions </th>
		      </tr>
		    </thead>

		    <tbody>
		      {
				   ideas
		      }
		    </tbody>
		  </table>
		</div>
  </div>
  )
}

export default React.memo(AllChallenges);