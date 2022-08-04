import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description,keywords}) => {
  return (
    <Helmet>
    <title>{title} </title> {/*if we set this in HomeScreen it gonna also be in oders if thers no helmet in those*/ }
    <meta name='description' content={description}/>
    <meta name='keywords' content={keywords}/>
  </Helmet>

  )
}

Meta.defaultProps={
    title:'Welcome To Proshop',
    description:'We sell the best products fro cheap',
    keywords:'electronics, buy electronics, cheap electronics'
}

export default Meta