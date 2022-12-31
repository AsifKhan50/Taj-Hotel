import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import CardsData from './CardsData'
import './style.css'
import { ADD } from '../redux/actions/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cards = () => {

  const [data, setData] = useState(CardsData);
  //  console.log(data)

 
   

  const dispatch = useDispatch()


  const send =(e) =>{
          dispatch(ADD(e))
          
          toast.success("Item Add in your cart", {
            position: toast.POSITION.TOP_CENTER
        });
          // alert('hello') 
        }

  return (
    <div className='container mt-3'>
      <h2 className='text-center'>Add to Cart Projects</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {
          data.map((element,id) => {
            return (
              <>
                <Card style={{ width: '22rem', border:'none' }} className='mx-2 mt-4 card_style'>
                  <Card.Img variant="top" src={element.imgdata} style={{height:'16rem'}} className='mt-3'/>
                  <Card.Body>
                    <Card.Title>{element.rname}</Card.Title>
                    <Card.Text>
                     Price : ₹ {element.price} 
                    </Card.Text>
                    <div className='button_div d-flex justify-content-center'>
                    <Button variant="primary" className='col-lg-12' onClick={()=>send(element)}>Add to Cart</Button>
                    <ToastContainer />
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default Cards