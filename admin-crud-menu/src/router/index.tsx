import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrimaryLayout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import ComingSoon from '../components/ComingSoon'
import GroceryCardDetails from '../components/GroceryCardDetails'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrimaryLayout />}>
        <Route index element={<Dashboard />} />
        <Route index path='/dashboard' element={<Dashboard />} />
        <Route index path='/product' element={<Dashboard />} />
        
        <Route index path='/item/details' element={<GroceryCardDetails />} />

        <Route index path='/analytics' element={<ComingSoon />} />
        <Route index path='/sale' element={<ComingSoon />} />
        <Route index path='/review' element={<ComingSoon />} />
        <Route index path='/chat' element={<ComingSoon />} />

      </Route>
    </Routes>
  )
}

export default AppRoutes