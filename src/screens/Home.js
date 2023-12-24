import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
export default function Home() {

  const [search, setSearch] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?barbeque" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
      <div className='container'>
        {
          foodCat!==[]
          ? foodCat.map((data)=>{
            return(
                <div className='row mb-3'>
                  <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                  </div>
                  <hr/>
                  {foodItem !==[]
                  ?
                  foodItem.filter((item)=>(item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toString().toLocaleLowerCase()))) .map(filterItems=>{
                    return(
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Cards foodItem={filterItems}
                                options={filterItems.options[0]}
                        ></Cards>
                        </div>
                    )
                  }):<div>No Such Item</div>}
                </div>
              )
          })
          :""
        }
       </div>
      <div><Footer /></div>
    </div>
  )
  // });
  // }
}







// export default function Home() {
//   const [foodCat, setFoodCat] = useState([])
//   const [foodItems, setFoodItems] = useState([])
//   const [search, setSearch] = useState('')
//   const loadFoodItems = async () => {
//     let response = await fetch("https://food4u-api.vercel.app/api/foodData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }

//     });
//     response = await response.json()
//     // console.log(response[1][0].CategoryName)
//     setFoodItems(response[0])
//     setFoodCat(response[1])
//   }

//   useEffect(() => {
//     loadFoodItems()
//   }, [])

//   return (
//     <div >
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

//           <div className="carousel-inner " id='carousel'>
//             <div className=" carousel-caption  " style={{ zIndex: "9" }}>
//               <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
//                 <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
//                 <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
//               </div>
//             </div>
//             <div className="carousel-item active" >
//               <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//           </div>
//           <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//           </button>
//           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>  
//           </button>
//         </div>
//       </div>
//       {/* Cards */}
//       <div className='container'> {/* boootstrap is mobile first */}
//         {
//           foodCat !== []
//             ? foodCat.map((data) => {
//               return (
//                 // justify-content-center
//                 <div className='row mb-3'>
//                   <div key={data.id} className='fs-3 m-3'>
//                     {data.CategoryName}
//                   </div>
//                   <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
//                   {foodItems !== [] ? foodItems.filter(
//                     (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
//                     .map(filterItems => {
//                       return (
//                         <div key={filterItems.id} className='col-12 col-md-6 col-lg-3 mt-2'> 
//                           {console.log(filterItems.url)}
//                           <Cards foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Cards>
//                         </div>
//                       )
//                     }) : <div> No Such Data </div>}
//                 </div> 
//               )
//             })
//             : ""}
//       </div>
//       <Footer />
//     </div>
//   )}
