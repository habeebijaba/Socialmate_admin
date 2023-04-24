import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Notifications from '../Components/Notifications/Notifications'
import Sidebar from '../Components/Sidebar/Sidebar'

function Notification() {
  return (
    <div className="list" style={{display:"flex", width:"100%"}}>
       <Sidebar/>
      <div className="listContainer" style={{flex:"6"}}>
        <Navbar/>
        <Notifications/>
      </div>
    </div>
  )
}

export default Notification
