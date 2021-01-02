import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import axios from 'axios';

import { setUserType, setRegIdentity, setCompany, setCustomer, setUserToken, initAdminToken } from './../../redux/actions/identity.actions';
//import {userTypes} from './../../types/userTypes'

import './../../styles/loginForm.style.css';
import { userTypes } from '../../types/userTypes';

function getFullUserDetails(token, userName) {
	let curUrl = "https://localhost:951/api/administrators/search/customers/byname?userName=" + userName
	return axios.get(curUrl, {
		headers: {
		//'Access-Control-Allow-Headers': 'Authorization',
		'Access-Control-Allow-Origin': "*",
		'Authorization': `Bearer ${token}`
		}
		})
		.then((res) => {
			if (res.data === null) {
				swal.fire("Somthing Wrong", `Sorry, We Can't Found Your User.`, 'warning')
				return null
			}
			else {
				swal.fire("Successfully Connected", `You Will Immadiately Be Taken To The Requested Page.`, 'success')
				return res.data
			}
		},(err) => {
			console.log(err)
		})
}

function LoginForm(props) {
	let type = "";
	if (props.history.location.pathname.includes("admin"))
		type = userTypes[1];
	else if (props.history.location.pathname.includes("company"))
		type = userTypes[2];
	else if (props.history.location.pathname.includes("customer"))
		type = userTypes[3];
	else
		type = userTypes[4]

	return (
		<div className="container" style={{ marginTop: '100px' }} >
			<div className="d-flex justify-content-center h-100">
				<div className="user_card">
					<div className="d-flex justify-content-center h-100">
						<div className="brand_logo_container">
							<div className="brand_logo" alt="Logo" />
						</div>
					</div>
					<div className="d-flex justify-content-center form_container">
						<Formik
							initialValues={{ userName: '', password: '' }}
							onSubmit={(values) => {
								axios.post("https://localhost:951/api/Auth", {
									UserName: values.userName,
									Password: values.password,
									Type: type,
									Headers: { 'Access-Control-Allow-Origin': "*" }
								})
									.then((res) => {
										props.setUserType(type)
										props.setUserToken(res.data)
										if (type === userTypes[2]) {
											const company = getFullUserDetails("search/company/", res.data)
											if (company != null) {
												props.setCompany(company)
												props.history.push("/company-profile")
											}
										}
										else {
											getFullUserDetails(props.adminToken, values.userName)
											.then((customer) =>{
											if (customer != null) {
												props.setCustomer(customer)
												props.history.push("/customer-profile")
											}
											})
										}
									}, (err) => {
										console.log(err);
										swal.fire(`Login Failed`, `${err.response}`, "error")
									});
							}}
						>
							{
								() => (
									<Form name="loginForm">
										<div className="input-group mb-3">
											<div className="input-group-append">
												<span className="input_group_text"><i className="fas fa-user"></i></span>
											</div>
											<Field type="text" name="userName" className="form-control input_user" placeholder="UserName..."></Field>
										</div>
										<div className="input-group mb-2">
											<div className="input-group-append">
												<span className="input_group_text"><i className="fas fa-key"></i></span>
											</div>
											<Field type="password" name="password" className="form-control input_pass" placeholder="Password..." ></Field>
										</div>
										<div className="row form-group">
											<div className="col-xs-12" style={{ marginLeft: '20px' }}>
												<input type="checkbox" className="col-xs-2" id="customControlInline"></input>
											</div>
											<div className="col-xs-1"></div>
											<div className="col-xs-4" style={{ margin: '0px 0px 0px 10px' }}>
												<label className="col-xs-4">Remember Me</label>
											</div>
										</div>
										<div className="d-flex justify-content-center mt-3 login_container">
											<button type="submit" name="button" className="btn login_btn">Login</button>
										</div>
									</Form>
								)}
						</Formik>
					</div>
					{/* <div className="mt-4">
						<div className="d-flex justify-content-center links" style={{ color: ' #0f0f0a' }}>
							Don't have an account? <button href="" className="ml-2" onClick={askWhichUserToRegister}>Sign Up</button>
						</div>
						<div className="d-flex justify-content-center links">
							<a href="#" onClick={forgotPassword}>Forgot your password?</a>
						</div>
					</div> */}
				</div>
			</div>
		</div >

	);
}

export default connect(
	(state) => ({
		identity: state.identity.identity,
		adminToken: state.identity.adminToken,
		userToken: state.identity.userToken
	}),
	{
		setUserType, setRegIdentity, setCompany, setCustomer, setUserToken, initAdminToken
	}
)(LoginForm);