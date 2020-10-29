import React from 'react'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from 'reactstrap'

function Image(props) {
  const data = props?props.ads:''
  return (
    <>
    {data &&
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">
              {'Ad ID: '+data?data.itemId:''}
            </h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          { data && data.images.map((image,index) =>
          <Col key={index} lg='4'>
            <div className="thumbnail mt-2">
              <img src={image} width='100%' className='img-thumbnail' />
            </div>
          </Col>)}
       </Row>
      </CardBody>
    </Card>}
    </>
  )
}
export default Image
