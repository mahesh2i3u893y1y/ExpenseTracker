import React from 'react'
import Navbar from './Navbar'

import ExpenseTracker from './ExpenseTracker'

const Body = () => {
  return (
    <div className='bg-gray-200 '>
        {/* <Expense/> */}
        <ExpenseTracker/>
    </div>
  )
}

export default Body