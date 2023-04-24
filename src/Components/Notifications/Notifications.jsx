import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import NotificationItem from "../NotificationItem/NotificationItem";
import { Divider } from "@mui/material";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const getNotifications = async () => {
        try {
            const {data}  = await axios.get(`/api/admin/getNotifications`, {})
            setNotifications(data);
        } catch (err) {
            console.log(err);
        }
    }
const handleUpdate=async()=>{
    getNotifications()
}


    useEffect(() => {
        getNotifications()
    }, [])


    return (
        <Box flex={4}>
            <Card sx={{
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                height: "90vh",
                width: "98%"
            }} >
                <Box sx={{
                    textAlign: "center"
                }}>
                    <Typography variant="h5" component="h1"sx={{marginTop:"1.5rem"}} >
                       Reported post requests
                    </Typography>
                    <Divider/>
                </Box>
                <Box>
                    <Box >
                        <Box sx={{
                            width: "90%", margin: "1rem", maxHeight: "80vh",
                            overflowY: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>
                            {notifications.length >=1 ?
                            notifications.map((item, i) => {
                                return (
                                    <>
                                        <NotificationItem key={i} notification={item} handleUpdate={handleUpdate} />
                                        <Divider />
                                    </>
                                );
                            })
                            :<Typography varient='h5' component="h1" sx={{marginTop:"13rem"}} >No pending requests</Typography>
                        }
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default Notifications
