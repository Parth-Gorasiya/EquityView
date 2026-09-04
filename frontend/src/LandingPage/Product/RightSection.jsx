import React from 'react'

function RightSection({imageURL, productName, productDescription, 
  learnMore}) {
  return (
    <div className='container mt-5'>
      <div className="row align-items-center">    

        <div className="col-12 col-md-6 p-5 ">
          <h1>{productName}</h1>
          <p className='text-muted'>{productDescription}</p>
          <div>
          <a href={learnMore} style={{textDecoration: "none"}}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
          

        </div>
        <div className="col-12 col-md-6 ">
          <img src= {imageURL}
           alt={`${productName} platform`}
            className="img-fluid"/>
        </div>
      </div>
    </div>
  )
}

export default RightSection