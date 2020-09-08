import { Route } from 'react-router-dom'
import  BookList from './containers/BookList'
import React from 'react';


const AllRoutes = () => {
    return(
        <Route exact path='/' component={BookList} />
    )
}

export default AllRoutes