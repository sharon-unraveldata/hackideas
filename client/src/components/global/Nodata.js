import React from 'react';
import './Common.scss';

function Nodata(props) {
 return (
     <tr>
       <td colSpan="6">
         <div className="d-flex justify-content-center align-items-center no-data">{ props.message || 'No Data Found' } </div>
       </td>
     </tr>
 )
}

export default Nodata;