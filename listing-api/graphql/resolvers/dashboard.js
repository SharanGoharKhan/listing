/* eslint-disable no-unmodified-loop-condition */
const User = require('../../models/user')
const Item = require('../../models/item')
const { months } = require('../../helpers/enum')
module.exports = {
  Query: {
    getDashboardTotal: async(_, args, context) => {
      console.log('getOrdersCount from dashboard')
      try {
        const starting_date = new Date(args.starting_date)
        const ending_date = new Date(args.ending_date)
        ending_date.setDate(ending_date.getDate() + 1)
        const filter_date = {
          createdAt: { $gte: starting_date, $lt: ending_date }
        }
        
        const users_count = await User.countDocuments(filter_date)
        const active_items = await Item.countDocuments({...filter_date, status:'ACTIVE'})
        const sold_items = await Item.countDocuments({...filter_date, status:'SOLD'})
        
        return {
          total_orders:active_items,
          total_users: users_count,
          total_sales:sold_items,
          // total_sales: paid_orders_amount.toFixed(2),
          // total_ratings: total_ratings,
        //   avg_ratings: avg_ratings.toFixed(2)
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    // getDashboardSales: async(_, args, context) => {
    //   console.log('getDashboardSales')
    //   try {
    //     const ending_date = new Date(args.ending_date)
    //     ending_date.setDate(ending_date.getDate() + 1)
    //     const sales_value = []
    //     const current_date = new Date(args.starting_date)
    //     while (current_date < ending_date) {
    //       const filter_start = new Date(current_date)
    //       const filter_end = new Date(filter_start).setDate(
    //         filter_start.getDate() + 1
    //       )
    //       const filter = { createdAt: { $gte: filter_start, $lt: filter_end } }
    //       const orders = await Order.find({
    //         ...filter,
    //         payment_status: 'PAID'
    //       }).select('paid_amount')
    //       const day = `${
    //         months[current_date.getMonth()]
    //       } ${current_date.getDate()}`
    //       const temp_sales_value = { day }
    //       // eslint-disable-next-line dot-notation
    //       temp_sales_value['amount'] = orders
    //         .reduce((acc, order) => acc + order.paid_amount, 0)
    //         .toFixed(2)
    //       sales_value.push(temp_sales_value)
    //       current_date.setDate(current_date.getDate() + 1)
    //     }
    //     return {
    //       orders: sales_value
    //     }
    //   } catch (err) {
    //     console.log(err)
    //     throw err
    //   }
    // },
    // getDashboardOrders: async(_, args, context) => {
    //   console.log('getDashboardOrders')
    //   try {
    //     const ending_date = new Date(args.ending_date)
    //     ending_date.setDate(ending_date.getDate() + 1)
    //     const sales_value = []
    //     const current_date = new Date(args.starting_date)
    //     while (current_date < ending_date) {
    //       const filter_start = new Date(current_date)
    //       const filter_end = new Date(filter_start).setDate(
    //         filter_start.getDate() + 1
    //       )
    //       const filter = { createdAt: { $gte: filter_start, $lt: filter_end } }
    //       const day = `${
    //         months[current_date.getMonth()]
    //       } ${current_date.getDate()}`
    //       const temp_sales_value = { day }
    //       // eslint-disable-next-line dot-notation
    //       temp_sales_value['count'] = await Order.countDocuments(filter)
    //       sales_value.push(temp_sales_value)
    //       current_date.setDate(current_date.getDate() + 1)
    //     }
    //     return {
    //       orders: sales_value
    //     }
    //   } catch (err) {
    //     console.log(err)
    //     throw err
    //   }
    // }
  }
}