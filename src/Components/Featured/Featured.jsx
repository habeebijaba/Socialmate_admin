import React from 'react'
import './Featured.scss'
import { MoreVert } from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from 'react'
import axios from '../../utils/axios';
import {getDashboardCount } from '../../utils/Constants';

function Featured() {

  const [users, setUsers] = useState(0)
  const [newUsers, setNewUsers] = useState(0)

  const getDashboard = async () => {
    try {
      const response = await axios.get(getDashboardCount)
      setUsers(response.data.usercount)
      setNewUsers(response.data.newuser)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total Users</h1>
        <MoreVert fontSize='small' />
      </div>
      <div className='bottom'>
        <div className="featuredChart">
          <CircularProgressbar value={users} text={`${users}%`} strokeWidth={5} />
        </div>
        <p className="title">Total users registered</p>
        <p className="amount">{users}</p>

      </div>
    </div>
  )
}

export default Featured