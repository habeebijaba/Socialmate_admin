import React from 'react'
import './Chart.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState,useEffect } from 'react';
import { getPostsByMonth } from '../../utils/Constants';
import axios from "../../utils/axios"

function Chart() {
  const [data, setdata] = useState([])

  const groupPostsByMonth = async () => {
    try {
      const response = await axios.get(getPostsByMonth)
      setdata(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    groupPostsByMonth()
  }, [])

  const chartdata = [
    { name: "Jan", Total: data[0]?.count },
    { name: "Feb", Total: data[1]?.count },
    { name: "March", Total: data[2]?.count },
    { name: "April", Total: data[3]?.count },
    { name: "May", Total: data[4]?.count },
    { name: "June", Total: data[5]?.count },
    { name: "july", Total: data[6]?.count },
    { name: "aug", Total: data[7]?.count },
    { name: "sep", Total: data[8]?.count },
    { name: "oct", Total: data[9]?.count },
    { name: "nov", Total: data[10]?.count },
    { name: "dec", Total: data[11]?.count },

  ];


  return (
    <div className='chart w-100'>
      <div className='title'>Total Posts(01/01/2023-31/12/2023)</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart width={730} height={250} data={chartdata}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke='gray' />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

  )
}

export default Chart