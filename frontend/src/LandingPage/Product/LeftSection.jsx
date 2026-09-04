import React from 'react'

function LeftSection({imageURL, productName, productDescription, tryDemo, 
  learnMore, googlePlay, appStore}) {
  return (
    <div className='container mt-5'>
      <div className="row ">
        <div className="col-12 col-md-6 ">
          <img src= {imageURL}/>
        </div>

        <div className="col-12 col-md-6 p-5">
          <h1>{productName}</h1>
          <p className='text-muted'>{productDescription}</p>
          <div>
            <a href={tryDemo} style={{textDecoration: "none"}}>Try Demo <i className="fa-solid fa-arrow-right"></i></a>
          <a href={learnMore} style={{marginLeft: "50px", textDecoration: "none"}}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
          
          <div className='mt-3'>
            <a href={googlePlay}><img src='media/images/googlePlayBadge.svg' alt="Get it on Google Play"></img></a>
          <a href={appStore}><img src='media/images/appstoreBadge.svg' alt="Download on the App Store" 
          style={{marginLeft: "50px"}}></img></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection