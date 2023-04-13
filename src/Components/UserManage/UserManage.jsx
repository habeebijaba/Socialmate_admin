import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Switch from '@mui/material/Switch';
import axios from '../../utils/axios';
import { getAllusers } from '../../utils/Constants';
import Toggler from './Toggler';
import "./UserManage.scss"
import UserImage from '../Userimage/UserImage'
const usersPerPage = 10;//for pagination

function UserManage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);//for pagination

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //for pagination

  const indexOfLastuser = currentPage * usersPerPage;
  const indexOfFirstuser = indexOfLastuser - usersPerPage;
  const currentusers = users.slice(indexOfFirstuser, indexOfLastuser);//for pagonation
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }//for pagination

  const getallusers = () => {
    axios.get(getAllusers)
      .then(response => {
        setUsers(response.data)
      }
      )
      .catch(error => console.error(error));
  }


  useEffect(() => {
    getallusers()
  }, []);

  const searchBy = (e) => {
    let key = e.target.value;
    if (!key) {
      getallusers()
    } else {
      axios.get(`/api/admin/searchUser/${key}`).then((response) => {
        setUsers(response.data)
      }).catch((error) => {

      })
    }

  }

  return (
    <div className='mt-3 ' style={{ width: "100%" }}>

      <div className="search-bar">
        <input
          type="text"
          name="query"
          placeholder="Search...."
          title="Enter search keyword"
          onChange={searchBy}
        />
      </div>


      <MDBTable align='middle' className='w-100'>
        <MDBTableHead>
          <tr>
            <th scope='col'>No</th>

            <th scope='col'>UserName</th>

            <th scope='col'>Profile Photo</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>

            <th scope='col'>Options</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody style={{ overflow: "scroll" }}>


          {currentusers.map((user, index) => (
            // <li key={user.id}>{user.name}</li>


            <tr key={user._id}>
              <td>{index + 1}</td>

              <td>
                <div className='d-flex align-items-center'>
                  {/* <img
                src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /> */}
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{user.username}</p>
                  </div>
                </div>
              </td>

              <td>
                <UserImage image={user.profilePic}
                />
              </td>
              <td>
                <p className='text-muted mb-0'>{user.email}</p>
              </td>
              <td>
                <p className='text-muted mb-0'>{user.phone}</p>
              </td>

              <td>
                {/* <CheckCircleIcon sx={{color:"green"}}/>
          <Switch  defaultChecked color="warning" /> */}

                <Toggler userId={user} />
              </td>
              {/* <td>
            <MDBBtn color='link' rounded size='sm'>
              Details
            </MDBBtn>
          </td> */}
            </tr>


          ))}


        </MDBTableBody>
      </MDBTable>
      <div className="pagination-button">
        <div>
          <button className="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous ({currentPage - 1})
          </button>
          <button className="button"
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next ( {currentPage + 1})
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserManage