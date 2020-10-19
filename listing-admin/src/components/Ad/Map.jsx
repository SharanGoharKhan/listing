import React from 'react'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from 'reactstrap'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

function Map(props) {
  //   if (!props.order) return null

  const center = { lat: 33.684422, lng: 73.047882 }

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
        <LoadScript
          googleMapsApiKey="AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA"
        >
          <GoogleMap
            mapContainerStyle={{
              height: '500px',
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
      </CardBody>
    </Card>
  )
}
export default Map
