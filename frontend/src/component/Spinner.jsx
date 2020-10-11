import React from 'react'
import Loader from 'react-loader-spinner'

function Spinner({data}) {
    return (
        <div style={{
            position:"fixed",
            top:"0px",
            left:"0px",
            width:"100vw",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.5)",
            zIndex:100,
            textAlign:"center",
            paddingTop:"30vh",
            display:data===false?"none":'block'
          }}>
          <Loader
             type="Puff"
             color="#00BFFF"
             height={100}
             width={100}
          />
          </div>
    )
}

export default Spinner
