/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import CustomLoader from '../Loader/CustomLoader'
import { subscribePlaceOrder, orderCount } from '../../apollo/server'
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap'
import { gql, useQuery } from '@apollo/client'

const ORDERCOUNT = gql`
  ${orderCount}
`
const ORDER_PLACED = gql`
  ${subscribePlaceOrder}
`

const AdsData = props => {
  const { selected, updateSelected } = props
  const [search, setSearch] = useState('')
  const { data, loading, error } = useQuery(ORDERCOUNT)

  const getItems = items => {
    // console.log(`items ${JSON.stringify(items[0])}`)
    return items
      .map(
        item =>
          `${item.quantity}x${item.product}(${item.selectedAttributes.map(
            i => i.title
          )})`
      )
      .join('\n')
  }

  const propExists = (obj, path) => {
    return path.split('.').reduce((obj, prop) => {
      return obj && obj[prop] ? obj[prop] : ''
    }, obj)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (field && isNaN(propExists(row, field))) {
        return propExists(row, field).toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const clearSearch = () => {
    props.search('')
    setSearch('')
  }
  const subHeaderComponent = () => {
    return (
      <div>
        <InputGroup>
          <Input
            placeholder="Filter By Ad Id"
            value={search}
            onChange={event => {
              props.search(event.target.value)
              setSearch(event.target.value)
            }}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={() => clearSearch()} color="primary">
              X
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }

  const handlePerRowsChange = async(perPage, page) => {
    props.page(page)
    props.rows(perPage)
  }

  const handlePageChange = async page => {
    props.page(page)
  }

  const columns = [
    {
      name: 'Ad ID',
      sortable: true,
      selector: 'orderId',
      cell: row => (
        <span className="mb-0 text-sm">{row.orderId}</span>
      )
    },
    {
      name: 'User',
      sortable: true,
      selector: 'user.name',
      cell: row => (
        <>{`${row.user.name}\n${row.user.email}\n${row.user.phone}`}</>
      )
    },
    {
      name: 'Title',
      cell: row => <>{getItems(row.items)}</>,
      grow: 2
    },
    {
      name: 'Description',
      selector: 'paymentMethod',
      grow: -1,
      center: true
    },
    {
      name: 'Condition',
      selector: 'orderStatus',
      grow: -1,
      center: true
    },
    {
      name: 'Image',
      selector: 'orderStatus',
      center: true,
      grow: -1,
      cell: row => <>{<a href='#' onClick={props.toggleModal} >
        <img src={require('../../assets/img/theme/profile-cover.jpg')} className='img-fluid img-thumbnail' />
      </a>
      }</>
    },
    {
      name: 'Map',
      selector: 'orderStatus',
      center: true,
      grow: -1,
      cell: row => <>{<a href='#' onClick={props.mapToggle}><i className="fas fa-map-marked-alt fa-2x p-3"></i></a>
      }</>
    },
    {
      name: 'Datetime',
      cell: row => (
        <>{new Date(row.createdAt).toLocaleString().replace(/ /g, '\n')}</>
      )
    }
    // {
    //   name: 'Address',
    //   cell: row => (
    //     <>{transformToNewline(row., 3)}</>
    //   )
    // }
  ]
  const conditionalRowStyles = [
    {
      when: row => row.orderStatus !== 'DELIVERED',
      style: {
        backgroundColor: 'rgba(60, 179, 113,0.2)'
      }
    }
  ]

  useEffect(() => {
    props.subscribeToMore({
      document: ORDER_PLACED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        if (subscriptionData.data.subscribePlaceOrder.origin === 'new') {
          return {
            allOrders: [
              subscriptionData.data.subscribePlaceOrder.order,
              ...prev.allOrders
            ]
          }
        } else {
          const orderIndex = prev.allOrders.findIndex(
            o => subscriptionData.data.subscribePlaceOrder.order._id === o._id
          )
          prev.allOrders[orderIndex] =
            subscriptionData.data.subscribePlaceOrder.order
          return { allOrders: [...prev.allOrders] }
        }
      },
      onError: error => {
        console.log('onError', error)
      }
    })
  }, [])

  useEffect(() => {
    if (selected) {
      const order = props.orders.find(o => o._id === selected._id)
      updateSelected(order)
    }
  }, [props.orders])

  if (error) {
    return (
      <tr>
        <td>
          {'Error'}! ${error.message}
        </td>
      </tr>
    )
  }
  return (
    <DataTable
      title={'Ads'}
      columns={columns}
      data={props.orders}
      // onRowClicked={props.mapToggle}
      progressPending={props.loading || loading}
      progressComponent={<CustomLoader />}
      onSort={handleSort}
      sortFunction={customSort}
      subHeader
      subHeaderComponent={subHeaderComponent()}
      pagination
      paginationServer
      paginationTotalRows={data ? data.orderCount : 0}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      conditionalRowStyles={conditionalRowStyles}
    />
  )
}
export default AdsData
