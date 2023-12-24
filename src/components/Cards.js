import React, { useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Cards(props) {
  let dispatch = useDispatchCart();
  let data = useCart()
  let option = props.options ?? {};
  let priceOptions = Object.keys(option);
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const handleAddToCart = async () => {
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalPrice, qty: qty, size: size })
    console.log(data)
  }
  return (
    <div>
      <div>
        <div className="card" style={{ "width": "18rem" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className='container w-100'>
              <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                  )
                })}
              </select>

              <select className='m-2 h-100  bg-success rounded' onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return (<option key={data} value={data}>{data}</option>)
                })}
              </select>

              <div className='d-inline h-100 fs-5'>Total Price</div>
            </div>
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} onclick={handleAddToCart}>Add to Cart</button>

          </div>
        </div>
      </div>
    </div>
  )
}
