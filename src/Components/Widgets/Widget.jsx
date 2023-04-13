import React from 'react'
import './Widget.scss'
import { KeyboardArrowUp, PersonOutlined, DynamicFeed, People } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import axios from '../../utils/axios';
import {getDashboardCount } from '../../utils/Constants';

function Widget({ type }) {

  const [users, setUsers] = useState(0)
  const [posts, setPosts] = useState(0)
  const [newUsers, setNewUsers] = useState(0)
  const [newPosts, setNewPosts] = useState(0)

  const getDashboard = async () => {
    try {
      const response = await axios.get(getDashboardCount)
      setUsers(response.data.usercount)
      setPosts(response.data.postcount)
      setNewUsers(response.data.newuser)
      setNewPosts(response.data.newpost)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])


  let data;
  const amount = 100
  const diff = 20

  switch (type) {
    case "user":
      data = {
        title: "TOTAL USERS",
        count: users,

        link: "See all users",
        icon: (
          <PersonOutlined
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "post":
      data = {
        title: "TOTAL POSTS",
        count: posts,

        link: "View all post",
        icon: (
          <DynamicFeed
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "users":
      data = {
        title: "NEW USERS",
        count: newUsers,

        link: "View daily users",
        icon: (
          <People
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "posts":
      data = {
        title: "NEW POSTS",
        count: newPosts,
        link: "See details",
        icon: (
          <DynamicFeed
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        {/* <span className='counter'>{data.isMoney && "$"} {amount}</span> */}
        <span className='counter' >{data.count ? data.count : 0}</span>
        <span className='link'>{data.link}</span>
      </div>
      <div className='right'>
        <div className="percentage positive">
          {/* <KeyboardArrowUp/> */}
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget