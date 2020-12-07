import React, { useState } from 'react'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Collapse,
  FormGroup,
  Input,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const STATUS = ['Active', 'Disable', 'Turn Off']

function AdDetails(props) {
  const [customerCollapse, setCustomerCollapse] = useState(true)
  const [adDetails, setAdDetails] = useState(true)
  const [adAction, setAdAction] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState(0)
  const data = props ? props.ads : ''
  const locData = data ? data.address.location.coordinates : null
  var center = { lat: 0, lng: 0 }
  if (locData) {
    center = { lat: Number(locData[1]), lng: Number(locData[0]) }
  }

  return (
    <>
      {data &&
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">
                  {'Ad ID: ' + data ? data.itemId : ''}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-1">{'User'}</h3>
              </Col>
              <Col xs="4" className='text-right'>
                <Button
                  color="primary"
                  onClick={() => {
                    setCustomerCollapse(prev => !prev)
                  }}
                  style={{ marginBottom: '1rem' }}>
                  Show/Hide
                </Button>
              </Col>
            </Row>
            <Collapse isOpen={customerCollapse}>
              <Row>
                <Col lg="4">
                  <label className="form-control-label" htmlFor="input-name">
                    {'Name'}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-name"
                      type="text"
                      disabled={true}
                      defaultValue={data.user.name}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <label className="form-control-label" htmlFor="input-phone">
                    {'Phone'}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-phone"
                      type="text"
                      disabled={true}
                      defaultValue={data.user.phone}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <label className="form-control-label" htmlFor="input-email">
                    {'Email'}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      type="text"
                      disabled={true}
                      defaultValue={data.user.email}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <label className="form-control-label" htmlFor="input-address">
                    {'Address'}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-address"
                      type="text"
                      disabled={true}
                      defaultValue={data.address.address}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Collapse>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-1">{'Actions'}</h3>
              </Col>
              <Col xs="4" className='text-right'>
                <Button
                  color="primary"
                  onClick={() => {
                    setAdAction(prev => !prev)
                  }}
                  style={{ marginBottom: '1rem' }}>
                  Show/Hide
                </Button>
              </Col>
            </Row>
            <Collapse isOpen={adAction}>
              <Row>
                <Col lg='2'>
                  <p>Status</p>
                </Col>
                <Col lg='4'>
                  <UncontrolledButtonDropdown >
                    <DropdownToggle caret color='success'>
                      {STATUS[selectedStatus]}
                    </DropdownToggle>
                    <DropdownMenu>
                      {STATUS.map((text, index) => (
                        <DropdownItem key={index} active={index === selectedStatus} onClick={() => setSelectedStatus(index)}>
                          {text}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </Col>
              </Row>

            </Collapse>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-1">{'Details'}</h3>
              </Col>
              <Col xs="4" className='text-right'>
                <Button
                  color="primary"
                  onClick={() => {
                    setAdDetails(prev => !prev)
                  }}
                  style={{ marginBottom: '1rem' }}>
                  Show/Hide
                </Button>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col>
                <Collapse isOpen={adDetails}>
                  <Row className="align-items-center">
                    <Col lg="3">
                      <label className="form-control-label" htmlFor="input-name">
                        {'Name'}
                      </label>
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          id="input-name"
                          type="text"
                          disabled={true}
                          defaultValue={data.title}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <label className="form-control-label" htmlFor="input-Description">
                        {'Description'}
                      </label>
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          id="input-Description"
                          rows={1}
                          // cols={50}
                          type="textarea"
                          readOnly
                          disabled={true}
                          defaultValue={data.address.address}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <label className="form-control-label" htmlFor="input-name">
                        {'Condition'}
                      </label>
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          id="input-name"
                          type="text"
                          disabled={true}
                          defaultValue={data.condition}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6'>
                      <Row>
                        {data && data.images.map((image, index) =>
                          <Col key={index} lg='6'>
                            <div className="thumbnail mt-2">
                              <img src={image} width='100%' className='img-thumbnail' />
                            </div>
                          </Col>)}
                      </Row>
                    </Col>
                    <Col lg='6'>
                      {locData &&
                        <LoadScript
                          googleMapsApiKey="AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA"
                        >
                          <GoogleMap
                            mapContainerStyle={{
                              height: '350px',
                              width: '100%'
                            }}
                            id="example-map"
                            zoom={14}
                            center={center}
                          // onLoad={onLoad}
                          // onUnmount={onUnmount}
                          >
                            <Marker
                              position={center}
                            />
                          </GoogleMap>
                        </LoadScript>
                      }
                    </Col>
                  </Row>
                </Collapse>
              </Col>
            </Row>
            <Row>

            </Row>
          </CardBody>
        </Card>}
    </>
  )
}
export default AdDetails
