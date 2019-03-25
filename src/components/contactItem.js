import React from 'react'
import { Link } from 'react-router-dom'

function ContactItem(props){        
    
    return(
        <div className="contact-item border" >
            <div className="media p-3">                    
                <div className="media-body">
                    <h4>{props.contact.Name}</h4>
                    <p>{props.contact.Tel}</p>
                    <p>{props.contact.Email}</p>
                    <p>{props.contact.House}, {props.contact.Street}</p>
                    <p>{props.contact.City}, {props.contact.County}</p>
                    <p>{props.contact.Postcode}</p>
                </div>                    
                <div className="clearfix">
                    <button className="btn btn-danger float-right"
                            onClick={() => {
                                            if(window.confirm("Please confirm contact delete"))
                                            {
                                                props.handleDelete(props.contact.id)
                                            }
                                        }
                                    }>Delete</button> 
                    <Link to={{
                        pathname: '/edit',
                        state:{
                            fromContact: props.contact
                        }
                    }} className="btn btn-primary float-right mr-2" >Edit</Link>                         
                    
                </div>
            </div>
        </div>
    )
}
export default ContactItem