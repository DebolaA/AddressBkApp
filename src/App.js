import React from "react"
import escapeRegExp from 'escape-string-regexp'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from "./components/Header"
import Footer from "./components/Footer"
import ContactItem from "./components/contactItem"
import contactData from "./components/contactData"
import CreateContact from "./components/createContact"
//import EditContact from "./components/EditContact"

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            queryContacts: contactData,
            contactItems: contactData,
            contactDataCnt: contactData.length
        }
    }
    componentDidMount(){
        this.handleCreateContact()
    }
    handleContactSearch = (query) => {
        let showQueryContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showQueryContacts = this.state.contactItems.filter((contact) => match.test(contact.Name))
           } 
        else {
             showQueryContacts = this.state.contactItems
           }
        this.setState({ queryContacts: showQueryContacts })
    }

    handleDelete = (id) => {
        this.setState(prevState => {
            const updateData = prevState.queryContacts.filter(item => !(item.id === id))
            const updateContacts = prevState.queryContacts.filter(item => !(item.id === id))
            const cnt = updateData.length
            return {
                queryContacts: updateData,
                contactItems: updateContacts,
                contactDataCnt: cnt
            }
        })
    }

    handleContactEdit = (contact) => {
        console.log(`contact is ${contact.id}`);
    }

    handleCreateContact = () => {                
        localStorage.getItem('contact') && this.setState((prevState) => {
            const dd = JSON.parse(localStorage.getItem('contact'))
            const newData = prevState.contactItems.concat(dd)
            const quData = prevState.queryContacts.concat(dd)
            localStorage.removeItem('contact')
            return{
                contactItems: newData,
                queryContacts: quData,
                contactDataCnt: newData.length
            }
        })  
    }

    render(){
        const contactComponent = this.state.queryContacts.map(addressItem => 
            <ContactItem 
                key={addressItem.id} 
                contact = {addressItem} 
                handleContactEdit={this.handleContactEdit}
                handleDelete={this.handleDelete}
            />)

        return(
            <BrowserRouter>
                <div className="container">
                    <Header contactCnt={this.state.contactDataCnt}
                            handleContactSearch={this.handleContactSearch} />
                    <Route exact path='/create' component={CreateContact} />
                    {/* <Route exact path='/edit' component={EditContact} />                     */}
                    <div style={{display: 'block'}}>
                        {contactComponent}
                    </div>
                    
                
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

export default App