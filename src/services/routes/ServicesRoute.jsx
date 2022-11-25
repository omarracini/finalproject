import { Routes, Route, Navigate } from 'react-router-dom'
import { CheckServicesPage } from '../pages/CheckServicesPage'
import { CreateServicesPage } from '../pages/CreateServicesPage'
import { ServicesPage } from '../pages/ServicesPage'


export const ServicesRoutes = () => {
  return (

    <Routes>

        <Route path='/' element={ <ServicesPage /> }/>
        {/* <Route path='create' element={ <CreateServicesPage /> }/> */}
        {/* <Route path='check' element={ <CheckServicesPage /> }/> */}

        <Route path='/*' element={ <Navigate to="/"/> }/>

    </Routes>

    )
}
