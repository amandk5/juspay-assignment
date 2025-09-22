import { createSlice } from '@reduxjs/toolkit';

// Sample order data for demonstration
const initialOrders = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    date: '2025-09-15',
    status: 'Pending',
    amount: 299.99,
    items: ['Product A', 'Product B']
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    date: '2025-09-16',
    status: 'Completed',
    amount: 150.00,
    items: ['Product C']
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customer: 'Bob Johnson',
    date: '2025-09-17',
    status: 'Processing',
    amount: 75.50,
    items: ['Product D', 'Product E']
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customer: 'Alice Brown',
    date: '2025-09-18',
    status: 'Shipped',
    amount: 425.25,
    items: ['Product F']
  }
];

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: initialOrders,
    filteredOrders: initialOrders,
    statusFilter: 'All',
    searchTerm: '',
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.filteredOrders = filterOrders(state.orders, action.payload, state.searchTerm);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredOrders = filterOrders(state.orders, state.statusFilter, action.payload);
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      state.filteredOrders = filterOrders(state.orders, state.statusFilter, state.searchTerm);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(order => order.id === id);
      if (order) {
        order.status = status;
        state.filteredOrders = filterOrders(state.orders, state.statusFilter, state.searchTerm);
      }
    },
  },
});

function filterOrders(orders, statusFilter, searchTerm) {
  let filtered = orders;
  
  if (statusFilter !== 'All') {
    filtered = filtered.filter(order => order.status === statusFilter);
  }
  
  if (searchTerm) {
    filtered = filtered.filter(order => 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered;
}

export const { setStatusFilter, setSearchTerm, addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
