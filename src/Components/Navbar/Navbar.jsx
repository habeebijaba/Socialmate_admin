import React from "react";
import "./Navbar.scss";
import {
  SearchOutlined,
  DarkModeOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="" placeholder="" />
          <SearchOutlined />
        </div> */}
        <div className="items">
          <div className="item">
            <DarkModeOutlined className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
          <div className="item">
            {/* <Avatar sx={{width:30, height:30}} src='https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'/> */}
            <Button
              onClick={() => dispatch(setLogout())}
            
              variant="contained"
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
