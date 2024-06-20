import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    let data = useCart();
    const [qty,setQty] = useState(1);
    const [size,setSize] = useState("");
    const priceRef = useRef();

    let navigate = useNavigate();
    let dispatch = useDispatchCart();
    let options = props.options;
    let price = Object.keys(options);

    const handleClick = () => {
        if (!localStorage.getItem("authToken")) {
          navigate("/login")
        }
      }
      const handleQty = (e) => {
        setQty(e.target.value);
      }
      const handleOptions = (e) => {
        setSize(e.target.value);
      }
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty: qty, size: size});
    }
    let finalPrice = qty*parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value);
    },[]);
  return (
    <div>
        <div>
            <div className="card mt-3" style={{"width": "18rem", "maxHeight": "360px"}}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"140px", objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100 p-0' style={{height:"38px"}}>
                        <select className='m-2 h-100 bg-success text-black rounded' style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
                            {Array.from(Array(6), (e,i) => {
                                return (
                                    <option key={i+1} value={i+1}>{i+1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{select: "#FF0000"}} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
                            {
                                price.map((data)=>{
                                    return <option key = {data} value = {data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='d-inline ms-2 h-100 w-20 fs-5'>₹{finalPrice}/-</div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}
