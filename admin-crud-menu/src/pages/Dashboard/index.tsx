import React, { useState } from 'react'
import Header from './components/Header'
import { ISelectOption } from '../../interface/common'
import Body from './components/Body'


export  const FilterOptions = [
  { value: 'All', label: 'All' },
  { key: 0, value: 'BY_DATE_POSTED', label: 'By Date Posted', isDateRange: true},
  { key: 1,value: 'BY_DATE_TREND', label: 'By Date Trending', isDateRange: true },
  { key: 2,value: 'POSTED_BY', label: 'Posted By', subFilter:  null },


]

const Dashboard = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<ISelectOption>({ label: 'All', value: 'All' })

  const handleSearch = () => {

  }

  return (
    <div className=''>
      <div className='relative'>
      <Header 
      search={search}
      handleSearch={handleSearch}
      setSearch={setSearch}
      filterBy={FilterOptions}
      setFilterBy={setSelectedFilter}/>
      </div>
      <Body/>

    </div>
  )
}

export default Dashboard