import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'moment';



import './../../styles/custTickets.style.css';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'

class CustTickets extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            tickets: []
        }
    }

    componentDidMount() {
        return axios.get("https://localhost:951/api/customers/fullTickets", {
            headers: {
                'Access-Control-Allow-Headers': 'Authorization',
                'Access-Control-Allow-Origin': "*",
                'Authorization': `Bearer ${this.props.userToken}`
            }
        })
            .then((res) => {
                this.setState({ tickets: res.data.length > 0 ? res.data : [] })
                let myTickets = []
                myTickets = this.state.tickets.map(function (item) {
                    myTickets.push(item)
                })
            }, (err) => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state.tickets)
        return <div className="gtco-container">
                <div className="All-Tickets-Container">
            <div className="row Tickets-Row">
                    {(this.state.tickets == undefined || this.state.tickets.length == 0) ?
                        <button className="btn Button-Buy-Ticket">Click Here To Purchase Your First Ticket!</button> :
                        this.state.tickets.map(function (ticket, i) {
                            return <div key={ticket.Id} className="col-lg-4 col-md-5 col-sm-6 col-12">
                                <div className="Single-Ticket" data-effect="zoom">
                                    <label className="Ticket-FlightId Ticket-Data" data-toggle="tooltip" title={`Ticket Number: ${ticket.Id}`}>{ticket.Id}</label>
                                    <br />
                                    <label className="Ticket-Countries-Title Ticket-Data">Origin: </label>
                                    <br />
                                    <label className="Ticket-Countries-Info Ticket-Data" data-toggle="tooltip" title={ticket.OriginCountryName}>{ticket.OriginCountryName}</label>
                                    <br />
                                    <label className="Ticket-Countries-Title Ticket-Data">Destination:</label>
                                    <br />
                                    <label className="Ticket-Countries-Info Ticket-Data" style={{ marginBottom: '8px' }} data-toggle="tooltip" title={ticket.DestinationCountryName}>{ticket.DestinationCountryName}</label>
                                    <br />
                                    <label className="Ticket-Details-Title Ticket-Data"><b>Company:</b></label>
                                    <br />
                                    <label className="Ticket-Details-Info Ticket-Data" data-toggle="tooltip" title={ticket.CompanyName}>{ticket.CompanyName}</label>
                                    <br />
                                    <label className="Ticket-Details-Title Ticket-Data"><b>Departure Time:</b></label>
                                    <br />
                                    <label className="Ticket-Details-Info Ticket-Data" data-toggle="tooltip" title={Moment(ticket.DepartureTime).format('mm:hh DD/MM/YY')}>
                                        {Moment(ticket.DepartureTime).format('mm:hh DD/MM/YY')}</label>
                                    <br />
                                    <label className="Ticket-Details-Title Ticket-Data"><b>Landing Time:</b></label>
                                    <br />
                                    <label className="Ticket-Details-Info Ticket-Data" style={{ borderBottom: 'darkblue 4px solid' }} data-toggle="tooltip" title={Moment(ticket.LandingTime).format('mm:hh DD/MM/YY')}>
                                        {Moment(ticket.LandingTime).format('mm:hh DD/MM/YY')}</label>
                                </div>
                            </div>
                        })}
                </div>
            </div>
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