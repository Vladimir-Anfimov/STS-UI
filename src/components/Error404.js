
import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import Navbar from './layout/Navbar'

const Error404 = (props) =>{
    useEffect(()=>{
         console.log(props.location)
    },[])

    return (
            <div className="container text-center mt-5">
                <h1 className="text-dark">Error 404</h1>
                <h2 className="text-dark">Pagina nu exista</h2>
            </div>
    )
}

export default withRouter(Error404)

