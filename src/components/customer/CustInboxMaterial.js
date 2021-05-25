import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder } from 'react-table'
import 'react-tabs/style/react-tabs.css';

import { setUserMessages } from '../../redux/actions/data.actions'
import { MESSAGES_COLUMNS } from '../main/messagesTable/MesagesColmuns'
import PageNotFound from '../main/404';

import './../../styles/CustStyle/custInbox.style.css';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import { GlobalFiltering, ColumnFiltering } from '../main/messagesTable/GlobalFiltering.js';
import { CheckBox } from '../main/messagesTable/CheckBox.js';


function CustInbox(props) {
    if (props.curCustomer === undefined) {
        return (
            <PageNotFound />
        );
    }
    if (props.userMessages === undefined || props.userMessages.length < 1) {
        getAllMessagesForCurrentUser(props.curCustomer.Id, props.adminToken, props.setUserMessages)
    }
    let MessagesTable = ShowMessagesTable(props.userMessages)
    return (
        <div>
            <Tabs defaultIndex={1} onSelect={() => {
                console.log(MessagesTable)
            }}>
                <TabList className="tab">
                    <Tab key="1">All</Tab>
                    <Tab key="2">Sent</Tab>
                    <Tab key="3">Received</Tab>
                </TabList>
                <TabPanel key="1">{MessagesTable}</TabPanel>
                <TabPanel key="2">{MessagesTable}</TabPanel>
                <TabPanel key="3">{MessagesTable}</TabPanel>
            </Tabs>
        </div>
    );
}

async function getAllMessagesForCurrentUser(userId, adminToken, setUserMessages) {
    let curUrl = "https://localhost:951/api/administrators/messages/" + userId
    const res = await axios.get(curUrl, {
        headers: {
            //'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Origin': "*",
            'Authorization': `Bearer ${adminToken}`
        }
    })
    setUserMessages(res.data)
}

function extendMessage(rowNum) {
    console.log(rowNum)
}

function ShowMessagesTable(userMessages) {

    const columns = useMemo(() => MESSAGES_COLUMNS, [])
    const data = useMemo(() => userMessages, [])
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFiltering
        }
    }, [])

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        state,
        prepareRow,

        /*Pagination: ( Use 'page' Instead 'rows' Property) */
        page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize,

        /*GlobalFiltering*/ setGlobalFilter,
        /*Selected Rows*/ selectedFlatRows,
        /*columnsOrder*/setColumnOrder,
        /*hideColumns*/ allColumns, getToggleHideAllColumnsProps
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            //initialState: {pageIndex : 2}
        },
         /*Column Filter*/ useFilters,
         /*Global Filter*/ useGlobalFilter,
         /*Sort Rows*/ useSortBy,
         /*Pagination*/ usePagination,
         /*rows Selection*/ useRowSelect , (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <CheckBox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }, 
        /*Columns Order*/ useColumnOrder
    )

    const { globalFilter, pageIndex, pageSize } = state

    const changeOrderColumns = () => {
        setColumnOrder(['SenderName', 'CreateDate', 'Title', 'Body', 'IsReaded'])
    }
    return (
        <div>
            <div>
                <CheckBox {...getToggleHideAllColumnsProps()}/> Toggle All
            </div>
            {/* {
                allColumns.map(column => (
                <div key={column.id}>
                    <label>
                        <input type='checkbox' {...column.getToggleHiddenProps()}/>
                        {column.Header}
                    </label>
                </div>
                ))
            } */}
            <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} ></GlobalFiltering>
            <button onClick={changeOrderColumns}>Change Columns Orders</button>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                                    {column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    <span> {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''} </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                { row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
            <span>
                Page:{''}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <div>
                <span>
                    | Go To Page: {' '}
                    <input type='number' defaultValue={pageIndex + 1} onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }} style={{ width: '50px' }} />
                </span>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {[, 2, 5, 10, 25, 50].map((index, pageSize) => (
                        <option key={index} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        curCustomer: state.identity.curCustomer,
        adminToken: state.identity.adminToken,
        userToken: state.identity.userToken,
        userMessages: state.data.userMessages
    }),
    {
        setUserMessages
    }
)(CustInbox);
