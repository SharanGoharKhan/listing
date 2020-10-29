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
  var center = { lat: 0, lng: 0 }
  if (props.location && props.location.address) {
    center = { lat: Number(props.location.address.location.coordinates[0]), lng: Number(props.location.address.location.coordinates[1]) }
  }
  const data = props.location ? props.location : ''
  console.log("map",center)
  return (
    <>
      {data &&
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
      }
    </>
  )
}
export default Map
