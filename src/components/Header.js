import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            searchQueryStr: ""
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value }) 
    }

    render(){
        return(
            <div className="container">
                <header>
                    <h1>Address Book App</h1>  
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" 
                                placeholder="Search Contact"
                                value={this.state.searchQueryStr}
                                name="searchQueryStr"
                                onChange={this.handleChange}
                                onKeyUp={() =>{ 
                                    this.props.handleContactSearch(this.state.searchQueryStr)
                                }} 
                                />
                    </div>
                    <div className="center">
                        <strong>
                            <span style={{display: this.props.contactCnt === 0 && 'none'}}>You have {this.props.contactCnt} Contacts</span>
                            <span style={{display: this.props.contactCnt > 0 && 'none'}}>You have no saved contacts</span>
                        </strong>
                        <Link
                            to='/create'
                            className="badge badge-success float-right">Add New Contact</Link>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header