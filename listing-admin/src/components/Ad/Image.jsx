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
  // if (!props.order) return null
  return (
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">
              {'Ad ID: 2367'}
            </h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
          <Col lg='4'>
            <div className="thumbnail mt-2">
              <img src={require('../../assets/img/theme/profile-cover.jpg')} width='100%' className='img-thumbnail' />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default Image
