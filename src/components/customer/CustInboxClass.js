import React, {useMemo} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useTable, Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {MESSAGES_COLUMNS} from '../main/MesagesColmuns'
import PageNotFound from '../main/404';

import './../../styles/CustStyle/custInbox.style.css';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'

function getAllMessagesForCurrentUser(userId, token) {
    let curUrl = "https://localhost:951/api/administrators/messages/" + userId
    return axios.get(curUrl, {
        headers: {
            //'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Origin': "*",
            'Authorization': `Bearer ${token}`
        }
    })
}

// function CustInbox(props) {
//     if (props.curCustomer === undefined) {
//         return (
//             <PageNotFound />
//         );
//     }
//     else {
//         let allMessages = <div>No Messages</div>
//         getAllMessagesForCurrentUser(props.curCustomer.Id, props.adminToken).then((res) => {
//             allMessages = res.data.map((message) => {
//                 return (<div>{message.Id}</div>);
//             })
//         })
//         return (
//         <div>
//             {allMessages}
//             {/* <Tabs defaultIndex={2} onSelect={index => {}}}>
//                 <TabList className="tab">
//                     <Tab>All</Tab>
//                     {/* <Tab key="2">Sent</Tab>
//                     <Tab key="3">Received</Tab> */}
//                 {/*</div>* </TabList>
//                 <TabPanel re>{allMessages}</TabPanel>
//                 <TabPanel key="2">{allMessages}</TabPanel>
//                 <TabPanel key="3">{allMessages}</TabPanel>
//             </Tabs> */}
//         </div>

//         );
//     }
// }

class CustInbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allMessages: []
        }

        const columns = useMemo(() => MESSAGES_COLUMNS, [])
        const data = useMemo(() => this.state.allMessages, [])

        const tableInstance = useTable = ({
            columns,
            data
        })

        const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    }
     
    componentDidMount() {
        let curUrl = "https://localhost:951/api/administrators/messages/" + this.props.curCustomer.Id
        return axios.get(curUrl, {
            headers: {
                //'Access-Control-Allow-Headers': 'Authorization',
                'Access-Control-Allow-Origin': "*",
                'Authorization': `Bearer ${this.props.adminToken}`
            }
        }).then((res) => {
            this.setState((result) => {return {'allMessages': result } })
            // let messageJsxList = res.data.map((message) => {
            //     return (<div>{message.Id}. {message.Title} : {message.Body}</div>);
            // })
        })
    }
    
    showMessagesTable = () => {
        return (
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroups.getheaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    { rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                { row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                                </td>
                                    })}
                            </tr>
                    )})}
                </tbody>
            </table>
        );
    }

    render() {
        return <div>
            <Tabs defaultIndex={2} onSelect={index => {}}>
                <TabList className="tab">
                    <Tab key="1">All</Tab>
                    <Tab key="2">Sent</Tab>
                    <Tab key="3">Received</Tab>
                </TabList>
                {/* <TabPanel key="1">{this.state.allMessages}</TabPanel> */}
                <TabPanel key="1">{this.showMessagesTable()}</TabPanel>
                 {/* <TabPanel key="2">{this.state.allMessages.filter(m => m.Sender == this.props.curCustomer.Id)}</TabPanel> */}
                <TabPanel key="2">{this.state.allMessages}</TabPanel>
                <TabPanel key="3">{this.state.allMessages}</TabPanel>
                {/*<TabPanel key="3">{this.state.allMessages.filter(m => m.Receiver == this.props.curCustomer.Id)}</TabPanel> */}
            </Tabs>
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
)(CustInbox);
