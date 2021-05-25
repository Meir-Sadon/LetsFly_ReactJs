import React, {useState} from 'react'
import {useAsyncDebounce} from 'react-table'

export function GlobalFiltering({ filter, setFilter }) {
    const [value, setValue ] = useState(filter);

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 500)
    return (
        <div style={{marginLeft: '10px', marginBottom: '5px'}}>
            Search: {' '}
            <input value={value || ''} onChange={(e)     => {
            setValue(e.target.value)
            onChange(e.target.value)
            }}/>
        </div>
    );
}

export function ColumnFiltering({ column }) {
    const {filterValue, setFilter} = column
    return (
        <div>
            Search: {' '}
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)}></input>
        </div>
    );
}

export default GlobalFiltering