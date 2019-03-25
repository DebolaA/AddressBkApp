import React from 'react'

import contactData from "./contactData"

class EditContact extends React.Component{
    constructor(){
        super()
        this.state = {
            contacts: contactData,
            cdata: {},
            name: "",
            tel:"",
            email:"",
            house:"",
            street:"",
            city:"",
            county:"", 
            postcode:""
        }
    }
    componentDidMount(){        
        //const { id } = this.props.match.params
        const {fromContact} = this.props.location.state
        const data =  this.state.contacts.filter((contact) => contact.id === fromContact.id )
        //fromContact ? data = d  : data =this.handlePostcodeApiCall()
        console.log(data)
        this.setState({
            cdata: data,
            name: data.Name,
            tel: data.Tel,
            email: data.Email,
            house: data.House,
            street: data.Street,
            city: data.City,
            county: data.County, 
            postcode: data.Postcode
        })        
    }
    handleChange = (event) => {
        const {name, value, type} = event.target
        this.setState({ [name]: value })
    }
    handlePostcodeApiCall(){ 
        fetch("https://postcodes.io/postcodes/" + this.state.postcode)
            .then(response => response.json())
            .then(data => {return data})
    }
    render(){
        return(
            <form className="pt-4">
                <input 
                    type="text" 
                    value={this.state.name} 
                    name="name" 
                    placeholder="First Name             Last Name" 
                    onChange={this.handleChange}                     
                    className="form-control"
                />
                <br />
                <input 
                    type="tel" 
                    value={this.state.tel} 
                    name="tel" 
                    placeholder="Tel" 
                    maxLength="11"
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <br />
                <input 
                    type="email" 
                    value={this.state.email} 
                    name="email" 
                    placeholder="Email"
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <br />
                <input 
                    type="text" 
                    value={this.state.house} 
                    name="house" 
                    placeholder="House No" 
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <br />
                <input 
                    type="text" 
                    value={this.state.street} 
                    name="street" 
                    placeholder="Address Line 1" 
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <br />
                <input 
                    type="text" 
                    value={this.state.city} 
                    name="city" 
                    placeholder="City" 
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <br />
                <input 
                    type="text" 
                    value={this.state.county} 
                    name="county" 
                    placeholder="County"
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <br />
                <div class="input-group mb-1">
                    <input type="text" className="form-control" placeholder="Search Postcode"
                    onChange={this.handleChange} 
                    required />
                    <div className="input-group-append">
                        <button className="btn btn-success" type="submit" 
                            onClick={this.handlePostcodeApiCall()}>Go</button> 
                    </div>
                </div>
                <button className="btn btn-success">Submit</button>
                <br />
            </form>
        )
    }
}
export default EditContact