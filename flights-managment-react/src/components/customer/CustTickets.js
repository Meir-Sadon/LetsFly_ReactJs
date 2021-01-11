import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';

class CustTickets extends React.Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            tickets: []
        }
    }

    componentDidMount(){
        return axios.get("https://localhost:951/api/customers/fullTickets", {
            headers: {
                'Access-Control-Allow-Headers': 'Authorization',
                'Access-Control-Allow-Origin': "*",
                'Authorization': `Bearer ${this.props.userToken}`
            }
        })
        .then((res) => {
            this.setState({tickets: res.data.length > 0 ? res.data : []})
            let myTickets = []
            myTickets = this.state.tickets.map(function(item){
                myTickets.push(item)
            })
            },(err) => {
                console.log(err)
            })
        }

    render() {
        console.log(this.state.tickets)
        return <div>
             {(this.state.tickets == undefined || this.state.tickets.length == 0)  ? 
            <button>Click Here To Purchase Your First Ticket!</button> : 
                this.state.tickets.map(function(ticket, i) {
                return <div>
                Ticket Id: {ticket.Id}.
                Flight Id: {ticket.Flight_Id} 
                Customer Id: {ticket.Customer_Id}
                </div> 
            })}
        </div>
    }
}

export default connect(
    (state) => ({
        curCustomer: state.identity.curCustomer,
        adminToken: state.identity.adminToken,
        userToken: state.identity.userToken
    }),
    undefined
)(CustTickets);