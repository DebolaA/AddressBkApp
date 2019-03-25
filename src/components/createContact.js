import React from "react"
import {Link} from 'react-router-dom'

class CreateContact extends React.Component{
    constructor(){
        super()
        this.state = {
            loading: false,
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
        this.handlePostcodeApiCall();
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    handlePostcodeApiCall = () => { 
        if(this.state.postcode.length > 4){
            this.setState({loading: true})
            fetch("https://postcodes.io/postcodes/" + this.state.postcode)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({loading:false, 
                                    city: data.result.nuts, 
                                    postcode: data.result.postcode})                                    
                })
                .catch(error => {
                    console.log(error)
                    this.setState({loading:false})})
        }
    }
    handleSubmit = (event) => {
        console.log("submit")
        event.preventDefault()
        this.handleSave(event)
    }
    GetRandomNumber(){
        var min = 10;
        var max = 100;
        var rand =  min + (Math.random() * (max-min));
        return ~~rand
    }
    handleSave = (event) => {
        event.preventDefault()
        if(this.state){
            const newCntact = {
                "id": this.GetRandomNumber().toString(),
                "Name": this.state.name,
                "Tel": this.state.tel,
                "Email": this.state.email,
                "House": this.state.house,
                "Street": this.state.street,
                "City": this.state.city,
                "County": this.state.county,
                "Postcode": this.state.postcode
            }
            localStorage.setItem('contact', JSON.stringify(newCntact))
            this.props.history.push('/')
        }
    }
    
    render(){
        var { loading } = this.state;
        if(loading){
            return(<div>Loading ...</div>)
        }else{
            return(
                <form className="pt-4" onSubmit={this.handleSubmit} method="POST" >
                    <input 
                        type="text" 
                        value={this.state.name} 
                        name="name" 
                        placeholder="First Name       Last Name" 
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
                    <div className="input-group mb-1">
                        <input type="text" className="form-control" placeholder="Search Postcode" name="postcode" value={this.state.postcode}
                        onChange={this.handleChange} 
                        required />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-success" name="Update" value="Go"
                                            onClick={this.handlePostcodeApiCall} >Go</button> /> 
                        </div>
                    </div>
                    <div className="clearfix">
                        <Link
                            to='/'
                            className="btn btn-danger float-right">Cancel</Link>
                        <input type="submit" className="btn btn-success float-right mr-3" name="Save" value="Save" />
                        <div className="clearfix" style={{height: '10px'}}></div>
                    </div>
                </form>
            )
        }
    }
}
export default CreateContact