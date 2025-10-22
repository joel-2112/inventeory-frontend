export const inventoryStats = {
  totalItems: 1247,
  lowStock: 23,
  outOfStock: 5,
  totalValue: 125430,
  categories: 12
};

export const recentActivities = [
  { id: 1, item: "Laptop Dell XPS 13", action: "Stock Added", quantity: 50, time: "2 hours ago" },
  { id: 2, item: "iPhone 14 Case", action: "Stock Sold", quantity: 23, time: "4 hours ago" },
  { id: 3, item: "Samsung Monitor", action: "Low Stock Alert", quantity: 5, time: "6 hours ago" },
  { id: 4, item: "Wireless Mouse", action: "Stock Added", quantity: 100, time: "1 day ago" },
  { id: 5, item: "Mechanical Keyboard", action: "Stock Sold", quantity: 15, time: "1 day ago" }
];

export const lowStockItems = [
  { id: 1, name: "Samsung Monitor", currentStock: 5, minStock: 10, category: "Electronics" },
  { id: 2, name: "Gaming Chair", currentStock: 3, minStock: 8, category: "Furniture" },
  { id: 3, name: "USB-C Cable", currentStock: 7, minStock: 20, category: "Accessories" },
  { id: 4, name: "Webcam 1080p", currentStock: 2, minStock: 5, category: "Electronics" }
];

export const categoryDistribution = [
  { name: "Electronics", value: 35 },
  { name: "Accessories", value: 25 },
  { name: "Furniture", value: 15 },
  { name: "Office Supplies", value: 12 },
  { name: "Others", value: 13 }
];