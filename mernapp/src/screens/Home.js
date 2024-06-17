import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


function Home() {
  const [search,setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const loadData = async ()=>{
    let response = await fetch("http://localhost:8000/api/foodData",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }
  useEffect(()=> {
    loadData();
  },[]);
  return (
    <div>
        <div><Navbar/></div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{zIndex: "10"}}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value = {search} onChange={(e)=>{setSearch(e.target.value)}}/>
              </div>
              </div>
              <div className="carousel-item active">
                <img src="https://cdn.pixabay.com/photo/2022/08/29/17/45/burger-7419428_640.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="https://patelbakery.in/wp-content/uploads/2021/06/chocolate-pastry-2-new.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="https://static1.bigstockphoto.com/2/7/1/large1500/172785923.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
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
        </div>
        <div className='container'>
          {
            (foodCat !== [])
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key = {data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {foodItem !== []
                  ?
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filteredItems => {
                    return (
                      <div className='col-12 col-md-6 col-lg-3' key={filteredItems._id}>
                        <Card foodItem={filteredItems}
                        options = {filteredItems.options[0]}
                        
                        ></Card>
                      </div>
                    )
                  }):<div>No Such Data Found</div>
                  }
                </div>
              )
            })
            : <div>""""""</div>
          }
        </div>
        <div><Footer/></div>
    </div>
  )
}

export default Home