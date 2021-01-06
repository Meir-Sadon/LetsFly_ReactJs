import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import swal from 'sweetalert2';

import './../../styles/custProfile.style.css'
import PageNotFound from './../main/404';

function saveChanges(values) {

}

function CustProfile(props) {
    if (props.curCustomer === undefined){
        return(
            <PageNotFound/>
        );
    }
    else

        return (
            <div className="container">
                <div className="Base row">
                    <div className="col-12 mb-3">
                        <h1>Hey {props.curCustomer.First_Name} {props.curCustomer.Last_Name}</h1><br />
                    </div>
                    <Formik
                        initialValues={{
                            firstName: props.curCustomer.First_Name,
                            lastName: props.curCustomer.Last_Name,
                            phoneNumber: props.curCustomer.Phone_No,
                            email: props.curCustomer.User_Name,
                            password: props.curCustomer.Password,
                            country: props.curCustomer.Address != undefined ? props.curCustomer.Address.split(':')[0] === undefined ? "Unknown" : props.curCustomer.Address.split(':')[0] : "Unknown",
                            state: props.curCustomer.Address != undefined ? props.curCustomer.Address.split(':')[1] === undefined ? "Unknown" : props.curCustomer.Address.split(':')[1] : "Unknown",
                            city: props.curCustomer.Address != undefined ? props.curCustomer.Address.split(':')[2] === undefined ? "Unknown" : props.curCustomer.Address.split(':')[2] : "Unknown",
                            cardNumber: props.curCustomer.Credit_Card_Number,
                        }}
                        onSubmit={(values) => {
                            const country = values.country == "Unknown" ? "" : values.country;
                            const state = values.state == "Unknown" ? "" : values.state;
                            const city = values.city == "Unknown" ? "" : values.city;
                            let customer = {}
                            customer.Id = props.curCustomer.Id;
                            customer.First_Name = values.firstName == "Unknown" ? "" : values.firstName;
                            customer.Last_Name = values.lastName == "Unknown" ? "" : values.lastName;
                            customer.Phone_No = values.phoneNumber == "Unknown" ? "" : values.phoneNumber;
                            customer.User_Name = values.email == "Unknown" ? "" : values.email;
                            customer.Password = values.password == "Unknown" ? "" : values.password;
                            customer.Address = country + " : " + state + " : " + city;
                            customer.Credit_Card_Number = values.cardNumber == "Unknown" ? "" : values.cardNumber;
                            axios.put('https://localhost:951/api/administrators/update/customer/' + customer.Id,
                                customer,
                                {
                                    headers: {
                                        //"Accept": "application/json",
                                        //"Content-type": "application/json",
                                        //'Access-Control-Allow-Headers': 'Authorization',
                                        'Access-Control-Allow-Origin': "*",
                                        'Authorization': `Bearer ${props.adminToken}`
                                    }
                                }

                            ).then((res) => {
                                if (res.data === null) {
                                    swal.fire("Somthing Wrong", `Sorry, We Can't Update Your Details.`, 'error')
                                    return null
                                }
                                else {
                                    swal.fire(`You .`, 'success')
                                    return res.data
                                }
                            })
                        }}
                        className="row">
                        {
                            () => (
                                <div className="col-12" style={{ alignSelf: 'center' }}>
                                    <Form >
                                        <div className="col-6 form-left-side">
                                            <p><b><u>Your Details:</u></b></p>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >First Name: </span>
                                                </div>
                                                <Field className="profile-input" name="firstName" type="text" ></Field>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Last Name: </span>
                                                </div>
                                                <Field className="profile-input" name="lastName" type="text" ></Field>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Phone Number: </span>
                                                </div>
                                                <Field className="profile-input" name="phoneNumber" type="text" ></Field>
                                            </div>

                                            <p><b><u>Login Details:</u></b></p>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Email/UserName: </span>
                                                </div>
                                                <Field className="profile-input" name="email" type="text" ></Field>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Password: </span>
                                                </div>
                                                <Field className="profile-input" name="password" type="password"></Field>
                                            </div>
                                        </div>
                                        <h5 className="vl"></h5>
                                        <div className="col-6 form-right-side">
                                            <p><b><u>Address:</u></b></p>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Your Country: </span>
                                                </div>
                                                <Field className="profile-input" name="country" type="text" ></Field>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Your State: </span>
                                                </div>
                                                <Field className="profile-input" name="state" type="text" ></Field>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Your City: </span>
                                                </div>
                                                <Field className="profile-input" name="city" type="text" ></Field>
                                            </div><br />

                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span >Card Number: </span>
                                                </div>
                                                <Field className="profile-input" name="cardNumber" type="text" ></Field>
                                            </div>
                                            <button type="submit" name="button" className="btn login_btn mt-2" style={{ width: '88%' }}>Save Changes</button>
                                        </div>
                                    </Form>
                                </div>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
}

export default connect(
    (state) => ({
        curCustomer: state.identity.curCustomer,
        adminToken: state.identity.adminToken,
        userToken: state.identity.userToken
    }),
    undefined
)(CustProfile);