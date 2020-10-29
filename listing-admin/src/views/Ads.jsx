import React, { useState } from 'react'
import { Container, Row, Card, Modal } from 'reactstrap'
import ImageComponent from '../components/Ad/Image'
import AdsData from '../components/Ad/AdsData'
import Header from 'components/Headers/Header.jsx'
import { allItems } from '../apollo/server'
import { useQuery, gql } from '@apollo/client'
import MapComponent from '../components/Ad/Map'

const GET_ITEMS = gql`
  ${allItems}
`
function Ads(props) {
  const [detailsModal, setDetailModal] = useState(false)
  const [mapModal, setMapModal] = useState(false)
  const [order, setOrder] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { data, loading, error, subscribeToMore } = useQuery(GET_ITEMS, {
    variables: {
      lat: 0,
      long:0
    }
  })

  const toggleModal = order => {
    setOrder(order)
    setDetailModal(!detailsModal)
  }
  const mapToggle = (order) => {
    setOrder(order)
    setMapModal(prev => !prev)
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              {error ? (
                <tr>
                  <td>
                    {'Error'}! ${error.message}
                  </td>
                </tr>
              ) : (
                <AdsData
                  ads={data? data.allItems: []}
                  toggleModal={toggleModal}
                  mapToggle={mapToggle}
                  subscribeToMore={subscribeToMore}
                  loading={loading}
                  selected={order}
                  updateSelected={setOrder}
                  search={setSearch}
                  page={setPage}
                  rows={setRowsPerPage}
                />
               )}
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={detailsModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <ImageComponent ads={order} />
        </Modal>
        {/* Map */}
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={mapModal}
          toggle={() => {
            mapToggle(null)
          }}>
          <MapComponent location={order} />
        </Modal>
      </Container>
    </>
  )
}

export default Ads
