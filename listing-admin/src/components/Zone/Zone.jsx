import React, { useState, useRef } from 'react'
import { useMutation, gql } from '@apollo/client'
import { validateFunc } from '../../constraints/constraints'

// reactstrap components
import {
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from 'reactstrap'
import { GoogleMap, Polygon } from '@react-google-maps/api'

// core components
import { createZone, editZone, getZones } from '../../apollo/server'
const CREATE_ZONE = gql`
  ${createZone}
`
const EDIT_ZONE = gql`
  ${editZone}
`
const GET_ZONE = gql`
  ${getZones}
`

const Zone = (props) => {
    const [mutation] = useState(props.zone ? EDIT_ZONE : CREATE_ZONE)
    const [title, setTitle] = useState(props.zone ? props.zone.title : '')
    const [description, setDescription] = useState(
        props.zone ? props.zone.description : ''
    )
    const [polygon, setPolygon] = useState(
        props.zone ? transformPolygon(props.zone.location.coordinates[0]) : []
    )
    const [mutate, { loading }] = useMutation(mutation, {
        onCompleted,
        onError,
        refetchQueries: [{ query: GET_ZONE }]
    })
    const [errors, setErrors] = useState('')
    const [succes, setSuccess] = useState('')
    const [titleError, setTitleError] = useState(null)
    const [descriptionError, setDescriptionError] = useState(null)
    const [center] = useState(
        props.zone
            ? setCenter(props.zone.location.coordinates[0])
            : { lat: 33.684422, lng: 73.047882 }
    )
    const polygonRef = useRef()

    const onClick = e => {
        setPolygon([...polygon, { lat: e.latLng.lat(), lng: e.latLng.lng() }])
        console.log(e.latLng.lat(), e.latLng.lng())
    }

    function setCenter(coordinates) {
        return { lat: coordinates[0][1], lng: coordinates[0][0] }
    }

    const onBlur = field => {
        // this.setState({ [field + 'Error']: !validateFunc({ [field]: this.state[field] }, field) })
    }

    function transformPolygon(coordinate) {
        return coordinate.slice(0, coordinate.length - 1).map(item => {
            return { lat: item[1], lng: item[0] }
        })
    }

    const onSave = () => {
        var paths = polygonRef.current.state.polygon.getPaths()
        if (paths.i.length === 0) return
        const polygonBounds = paths.i[0].i
        console.log('polygon', polygonBounds)
        var bounds = []
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = [polygonBounds[i].lng(), polygonBounds[i].lat()]
            bounds.push(point)
        }
        bounds.push(bounds[0])
        console.log('polygon array', bounds)
        return [bounds]
    }

    const onSubmitValidaiton = () => {
        const titleErrors = !validateFunc({ title: title }, 'title')
        const descriptionErrors = !validateFunc(
            { description: description },
            'description'
        )
        let zoneErrors = true
        var paths = polygonRef.current.state.polygon.getPaths()
        if (paths.i.length === 0) {
            zoneErrors = false
            alert('Set Zone on Map')
            setErrors('Set Zone on Map')
            return false
        }
        console.log('paths length', paths.i[0].i.length)

        if (paths.i[0].i.length < 3) {
            zoneErrors = false
            setErrors('Please set 3 point to make zone')
        }

        setTitleError(titleErrors)
        setDescriptionError(descriptionErrors)
        return titleErrors && descriptionErrors && zoneErrors
    }
    const clearFields = () => {
        setTitle('')
        setDescription('')
        setTitleError(null)
        setDescriptionError(null)
        setPolygon([])
    }
    const onCompleted = data => {
        if (!props.zone) clearFields()
        const message = props.zone
            ? 'Zones updated successfully'
            : 'Zone added successfully'
        setErrors('')
        setSuccess(message)
        setTimeout(hideAlert, 5000)
    }

    const onError = ({ graphQLErrors, networkError }) => {
        setErrors(networkError.result.errors[0].message)
        setSuccess('')
        setTimeout(hideAlert, 5000)
    }
    const hideAlert = () => {
        setErrors('')
        setSuccess('')
    }

    return (
        <Row>
            <Col className="order-xl-1">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">
                                    {props.zone ? 'Edit Zone' : 'Add Zone'}
                                </h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-title">
                                            {'Title'}
                                        </label>
                                        <br />
                                        <small>{'Character limit of max length 30'}</small>
                                        <FormGroup
                                            className={
                                                titleError === null
                                                    ? ''
                                                    : titleError
                                                        ? 'has-success'
                                                        : 'has-danger'
                                            }>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-title"
                                                placeholder="e.g Title"
                                                maxLength="30"
                                                type="title"
                                                value={title}
                                                onChange={event => {
                                                    setTitle(event.target.value)
                                                }}
                                                onBlur={event => {
                                                    onBlur('title')
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-description">
                                            {'Description'}
                                        </label>
                                        <br />
                                        <small>{'Character limit of max length 20'}</small>
                                        <FormGroup
                                            className={
                                                descriptionError === null
                                                    ? ''
                                                    : descriptionError
                                                        ? 'has-success'
                                                        : 'has-danger'
                                            }>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-description"
                                                placeholder="e.g Description"
                                                maxLength="20"
                                                type="text"
                                                value={description}
                                                onChange={event => {
                                                    setDescription(event.target.value)
                                                }}
                                                onBlur={event => {
                                                    onBlur('description')
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <h3 className="mb-0">{'Coordinates'}</h3>
                                        <br />
                                    </Col>
                                </Row>

                                <Row>
                                    <GoogleMap
                                        mapContainerStyle={{
                                            height: '500px',
                                            width: '100%'
                                        }}
                                        id="example-map"
                                        zoom={14}
                                        center={center}
                                        onClick={onClick}>
                                        <Polygon
                                            ref={polygonRef}
                                            draggable
                                            editable
                                            paths={polygon}
                                        />
                                    </GoogleMap>
                                </Row>

                                <Row className="pt-5">
                                    <Col className="text-right" lg="6">
                                        <Button
                                            disabled={loading}
                                            color="primary"
                                            href="#pablo"
                                            onClick={async e => {
                                                e.preventDefault()
                                                if (onSubmitValidaiton()) {
                                                    const coordinates = onSave()
                                                    const t = transformPolygon(coordinates[0])
                                                    setPolygon(t)
                                                    // console.log(coordinates)
                                                    mutate({
                                                        variables: {
                                                            zone: {
                                                                _id: props.zone ? props.zone._id : '',
                                                                title,
                                                                description,
                                                                coordinates
                                                            }
                                                        }
                                                    })
                                                }
                                            }}
                                            size="md">
                                            {props.zone ? 'Update' : 'Save'}
                                        </Button>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="6">
                                        <Alert
                                            color="success"
                                            isOpen={!!succes}
                                            toggle={hideAlert}>
                                            <span className="alert-inner--icon">
                                                <i className="ni ni-like-2" />
                                            </span>{' '}
                                            <span className="alert-inner--text">
                                                <strong>{'Success'}!</strong> {succes}
                                            </span>
                                        </Alert>
                                        <Alert
                                            color="danger"
                                            isOpen={!!errors}
                                            toggle={hideAlert}>
                                            <span className="alert-inner--icon">
                                                <i className="ni ni-like-2" />
                                            </span>{' '}
                                            <span className="alert-inner--text">
                                                <strong>{'Danger'}!</strong> {errors}
                                            </span>
                                        </Alert>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Zone