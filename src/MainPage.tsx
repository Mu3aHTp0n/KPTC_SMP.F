import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MainHeader from './MainHeader'
import HomePage from './home/HomePage'
import NewsPage from './news/NewsPage'

export default function MainPage() {
  return (
    <>
        <MainHeader />
        <Routes>
            <Route path='/'     element={<HomePage />} />
            <Route path='/news' element={<NewsPage />} />
        </Routes>
    </>
  )
}
