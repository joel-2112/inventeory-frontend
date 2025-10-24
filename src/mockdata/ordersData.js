// mockdata/ordersData.js
export const ordersData = [
  {
    id: "ORD-001",
    date: "2024-01-20",
    status: "processing",
    priority: "high",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1-555-0123"
    },
    items: [
      { name: "MacBook Pro 16-inch", quantity: 1, price: 2499.99 },
      { name: "Wireless Mouse", quantity: 1, price: 79.99 }
    ],
    total: 2579.98,
    shipping: {
      address: "123 Business Ave",
      city: "San Francisco",
      country: "USA",
      method: "express"
    },
    estimatedDelivery: "2024-01-23",
    riskScore: 25
  },
  {
    id: "ORD-002", 
    date: "2024-01-19",
    status: "shipped",
    priority: "medium",
    customer: {
      name: "Mike Chen",
      email: "mike.chen@example.com", 
      phone: "+1-555-0124"
    },
    items: [
      { name: "Office Chair", quantity: 2, price: 299.99 },
      { name: "Desk Lamp", quantity: 1, price: 49.99 }
    ],
    total: 649.97,
    shipping: {
      address: "456 Corporate Blvd",
      city: "New York", 
      country: "USA",
      method: "standard"
    },
    estimatedDelivery: "2024-01-25",
    riskScore: 15
  },
  {
    id: "ORD-003",
    date: "2024-01-18", 
    status: "pending",
    priority: "high", 
    customer: {
      name: "Emma Davis",
      email: "emma.davis@example.com",
      phone: "+1-555-0125"
    },
    items: [
      { name: "Smartphone", quantity: 1, price: 899.99 },
      { name: "Phone Case", quantity: 1, price: 29.99 },
      { name: "Screen Protector", quantity: 2, price: 19.99 }
    ],
    total: 969.96,
    shipping: {
      address: "789 Tech Park",
      city: "Austin",
      country: "USA", 
      method: "express"
    },
    estimatedDelivery: "2024-01-22",
    riskScore: 75
  }
];