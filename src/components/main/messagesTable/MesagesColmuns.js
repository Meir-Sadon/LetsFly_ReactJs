import {format} from 'date-fns'
import { CheckBox } from './CheckBox'

export const MESSAGES_COLUMNS = [
    {
        Header: 'From',
        accessor: 'SenderName',
        Cell: ({value}) => {return <b>{value.substring(0, 15)+"..."}</b>;},
    },
    // {
    //     Header: 'To',
    //     accessor: 'ReceiverName'
    // },
    {
        Header: 'Message',
        columns: [
            {
                Header: 'Title',
                accessor: 'Title',
            },
            {
                Header: 'Body',
                accessor: 'Body',
                Cell: ({value}) => {return <b>{value.substring(0, 40)+"..."}</b>;},
            },
        ]
    },
    {
        Header: 'Create Date',
        accessor: 'CreateDate',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
    },
    {
        Header: 'Is Readed',
        accessor: 'IsReaded',
        Cell: ({ value }) => (<CheckBox checked={value == 'Y'} disabled />),
        disableFilters: true
    },
]