import "./Postmanage.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from '../../utils/axios';
import { getAllposts } from '../../utils/Constants';
import UserImage from "../Userimage/UserImage";
import Swal from "sweetalert2"
import { Box, Typography, ButtonGroup, Modal, styled } from "@mui/material"
const postsPerPage = 10;//for pagination

const Postmanage = () => {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);//for pagination


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //for pagination

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);//for pagonation
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }//for pagination

  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }



  const getallPosts = () => {
    axios.get(getAllposts).then(response => {
      setPosts(response.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getallPosts()
  }, [])

  const deletePost = (id) => {
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
        console.log("delete button clicked");
        axios.put(`/api/admin/deletePost/${id}`).then((response) => {
          getallPosts()
          Swal.fire(
            'Deleted!',
            'This post has been deleted.',
            'success'
          )
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

  const searchBy = (e) => {
    let key = e.target.value;
    if (!key) {
      getallPosts()
    } else {
      axios.get(`/api/admin/searchPost/${key}`).then((response) => {
        setPosts(response.data)
      }).catch((err) => {
        console.log(err);
      })
    }
  }


  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  })
  const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  })

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

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">No</TableCell>
              <TableCell className="tableCell">Post</TableCell>
              <TableCell className="tableCell">User</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Details</TableCell>
              {/* <TableCell className="tableCell">Payment Method</TableCell> */}
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((post, index) => (
              <TableRow key={post._id}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {post.image ?
                      <div className="ms-3" >
                        <img src={post.image} alt={post.content} className="image" />
                        <p  >{post.content}</p></div>
                      : post.content}
                    {/* {post.product} */}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{post.author.username}</TableCell>
                <TableCell className="tableCell">{formatDate(post.createdAt)}</TableCell>
                {/* <TableCell className="tableCell">{row.amount}</TableCell> */}
                {/* <TableCell className="tableCell">{row.method}</TableCell> */}
                <TableCell className="tableCell">
                  <Button onClick={(e) => setOpen(true)} variant="contained" size="medium" className="">
                    Details
                  </Button>
                  <StyledModal
                    open={open}
                    onClose={(e) => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box width={400} height={600} bgcolor={"background.default"} color={"text.primary"} p={1} borderRadius={5}>
                      <UserBox bgcolor={"#e3f2fd"} borderRadius={5} height={80} >
                        {/* <Avatar
              src='https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'
              sx={{ width: 30, height: 30 }}
            /> */}
                        <UserImage image={post.author.profilePic}
                        />
                        <Typography pl={10} fontSize={20} fontWeight={800} varient="span"> <u> {post.author.username}</u></Typography>
                      </UserBox>
                      <Typography varient='h2' fontWeight={800}> Post Deatails: </Typography>
                      <imageBox />
                      <Box pl={5} pb={2} pt={2}>
                        <img width={200} height={150} src={post.image} alt={post.description} className="image" />
                      </Box >
                      <Box >
                        <Typography  >Post Id:{post._id}</Typography>
                        <Typography>UserName:{post.author.username} </Typography>
                        <Typography>Description:{post.content}</Typography>
                        <Typography>Likes:{Object.keys(post.likes).length}</Typography>
                        <Typography>Comments:{post.comments.length}</Typography>
                        <Typography>Posted On:{formatDate(post.createdAt)}</Typography>
                      </Box>
                      <Box pt={8} >
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth mb={2}>
                          <Button onClick={(e) => setOpen(false)} >OK</Button>
                        </ButtonGroup>
                      </Box>
                    </Box>
                  </StyledModal>
                </TableCell>
                <TableCell className="tableCell">
                  {post.isDeleted ? <Button>Restricted</Button> :
                    <Button onClick={() => deletePost(post._id)} variant="outlined" color="error" size="medium" className="">
                      Restrict
                    </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
      <div  className="pagination-button">
          <div> 
            <button className="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous ({currentPage-1})
            </button>
            <button  className="button"
              disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next ( {currentPage + 1})
            </button>
          </div>
          </div>
    </div>

  );
};

export default Postmanage;