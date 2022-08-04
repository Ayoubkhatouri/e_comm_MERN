import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Spinner,Form } from "react-bootstrap"
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { listProductDetails ,productCreateReview} from '../features/product/productSlice'
import Message from '../components/Message'
import Meta from '../components/Meta'


const ProductScreen = () => {
    const [qty,setQty]=useState(1)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState('')


    const dispatch=useDispatch()
    
    const navigate=useNavigate()

    const product=useSelector(state=>state.product)
    
    const {isLoading,isError,message,productDetails}=product 
  
    

    const {Successcreate,Loadingcreate,Errorcreate,messageErrorcreate}=product.createReviewInfo

    const user=useSelector(state=>state.user)
    const {userInfo}=user 
   
    const params = useParams()

    useEffect(() => {
        if(Successcreate){
            alert('Reveiw Submited !')
            setRating(0)
            setComment('')
        }
        dispatch(listProductDetails(params.id))

    }, [dispatch,params.id,Successcreate])


    const addtoCartHandler=()=>{
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    const sumbmitHandler=(e)=>{
        e.preventDefault()
        const productId_and_review={
            productId:params.id,
            review:{
                rating,
                comment
            }
        }

        dispatch(productCreateReview(productId_and_review))
    }

    if(isLoading)
    return <Spinner/>

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {isError ? <Message variant='danger'>{message}</Message> : (
                <>
                <Meta title={productDetails.name}/>
            <Row>    
                <Col md={5}>
                    <Image src={productDetails.image} alt={productDetails.name} fluid />{/*fluid to keep the image in its container*/}
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{productDetails.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={productDetails.rating} text={`${productDetails.numReviews} Reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${productDetails.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${productDetails.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${productDetails.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {productDetails.countInStock > 0 ? 'In Stock' : 'Out of Stock '}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {productDetails.countInStock >0 && (
                                <ListGroupItem >
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                        <Form.Control 
                            as  ='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(productDetails.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                                            
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}

                            <ListGroupItem>
                                <Button onClick={addtoCartHandler} className='btn-block ' type='button' disabled={productDetails.countInStock === 0}>Add To Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                       { !(productDetails && productDetails.reviews && productDetails.reviews.length>0) && <Message>No Reviews</Message>}
                       { (productDetails && productDetails.reviews && productDetails.reviews.length>0) &&(
                       <ListGroup variant='flush'>
                                {productDetails.reviews.map((review)=>(
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                               
                                ))}
                                    </ListGroup>)
                                }
                                 <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {Errorcreate && <Message variant='danger'>{messageErrorcreate}</Message>}
                                    {userInfo ? (
                                    <Form onSubmit={sumbmitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} 
                                            onChange={(e)=>setRating(e.target.value)}>
                                                <option value=''>Select ...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment}
                                            onChange={(e)=>setComment(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Submit</Button>
                                    </Form>)
                                        :
                                    <Message>Please <Link to='/login'>Sign in</Link> to write a review{" "} </Message>}
                                </ListGroup.Item>
                                </ListGroup>
         
            
                </Col>
            </Row>
            </>
            )}
            
        </>
    )
}

export default ProductScreen