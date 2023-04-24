import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import axios from '../../utils/axios';


const NotificationItem = ({ notification, handleUpdate }) => {

    const approveReport = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((response) => {
            if (response.isConfirmed) {
                axios.put(`/api/admin/reportPost/${id}`, { notificationId: notification._id }).then((response) => {
                    Swal.fire(
                        'Deleted!',
                        'This post has been deleted.',
                        'success'
                    )
                    handleUpdate()
                }).catch((err) => {
                    Swal.fire(
                        'OOPS!', err,
                        'Some Error.',
                        // 'success'
                    )
                })
            }
        })
    } 

    return (
        <Box >
            <Stack direction="row" justifyContent="space-between" alignItems="center" >
                <Box marginTop="1rem" minWidth="max-content">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Avatar src={notification.user.profilePic} sx={{ width: 60, height: 60, marginRight: "1rem" }} />

                        <Typography variant="p" fontWeight={600}>
                            {notification.user.username}
                        </Typography>
                        <Typography variant="p" marginLeft="1rem" >
                            Just reported
                        </Typography>
                        <Box marginLeft="1rem">
                            <Typography variant="p" fontWeight={600}>
                                {notification?.postOwner?.username}'s Post
                            </Typography>
                            <Typography variant="p" marginLeft="1rem" >
                                due to te reason: {notification?.reason}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box sx={{ marginTop: "1rem" }} >
                    {
                        notification?.postId.isReported ? <Button>Restricted</Button> :
                            <Button sx={{ marginRight: "4rem" }} onClick={() => approveReport(notification.postId._id)} variant="outlined" color="error" size="medium" className="">
                                Restrict
                            </Button>
                    }
                    {
                        <img src={notification?.postId?.image} alt='' style={{
                            width: "4rem",
                            height: "4rem",
                            objectFit: "cover"
                        }} />
                    }

                </Box>
            </Stack>
        </Box>
    )
}

export default NotificationItem
