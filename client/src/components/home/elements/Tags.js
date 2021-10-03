
function Tags(props) {
 
 const tagClasses = [
  'bg-primary',
  'bg-secondary',
  'bg-success',
  'bg-danger',
  'bg-warning',
  'bg-info',
  'bg-dark'
 ]

 const getRandomClass = () =>{
  return tagClasses[props.id%7]
 }

 return (
   <span className={`badge me-1 ${ getRandomClass() }` }>{props.tag.label}</span>
 )
}

export default Tags;