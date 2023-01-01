import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Cart from './img/Cart.gif'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import './style.css'
import { DLT } from '../redux/actions/action';
// import Logo from './img/background.jpg'


const Header = () => {

    const [price, setPrice] = useState(0)

    const getData = useSelector((state) => state.cartreducer.carts)

    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

   

    const dlt = (id)=>{
        dispatch(DLT(id))
    }

    const total = () =>{
        let price = 0;
        getData.map((ele,k)=>{
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    }

    useEffect(() => {
        total();
    
    }, [total])
    

    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{ height: '60px' }}>
                <Container>
                    <NavLink to="/" className='text-decoration-none text-light mx-3'>Add to cart</NavLink>
                    {/* <img src={Logo} className='mx-3' style={{width:100}}  alt="" /> */}
                    <Nav className="me-auto">
                        <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getData.length} color="primary" id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <ShoppingCartIcon sx={{ color: 'white', fontSize: 30, cursor: 'pointer' }} />
                    </Badge>
                </Container>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}

                >

                    {
                        getData.length ?
                            <div className="card_details" style={{ width: '24rem', padding:10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photos</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e)=>{
                                                return(
                                                    <>
                                                      <tr>
                                                          <td>
                                                            <NavLink to={`/cart/${e.id}` } onClick={handleClose}>
                                                              <img src={e.imgdata} alt="" style={{width:'5rem',height:'5rem'}}/>
                                                            </NavLink>
                                                          </td>
                                                          <td>
                                                             <p>{e.rname}</p>
                                                             <p>Price : ₹ {e.price}</p>
                                                             <p>Quantity : {e.qnty}</p>
                                                             <p className='smalltrash'>
                                                                 <DeleteIcon style={{color:'red',fontSize:20,cursor:'pointer'}} onClick={()=>dlt(e.id)} />
                                                             </p>
                                                          </td>

                                                          <td className='mt-5 largetrash'>
                                                                 <DeleteIcon style={{color:'red',fontSize:20,cursor:'pointer'}} onClick={()=>dlt(e.id)}/>
                                                          </td>
                                                      </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total : {price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: '24rem', padding: 10, position: 'relative' }}>
                                <CloseIcon style={{ position: 'absolute', top: 2, right: 20, fontSize: 23, cursor: 'pointer' }} onClick={handleClose} />
                                <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
                                <img src={Cart} alt="img" className='emptycart_img' style={{ width: '5rem', padding: 10 }} />
                            </div>
                    }
                </Menu>

            </Navbar>
        </div>
    )
}

export default Header