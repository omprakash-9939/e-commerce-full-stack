export function detectCollection(question) {
  const q = question.toLowerCase();

  if (q.includes("user") || q.includes("customer") || q.includes("email")) return "User";
  if (q.includes("order") || q.includes("invoice") || q.includes("status")) return "Order";
  if (q.includes("product") || q.includes("item") || q.includes("price")) return "Product";

  return "all";
}

export function summarizeData({ users = [], orders = [], products = [] }) {
  return `
Users (${users.length} found):
${users.map(u => `- ${u.name} (${u.email}, role: ${u.role})`).join("\n")}

Orders (${orders.length} found):
${orders.map(o => `- Order ${o.orderId} (${o.status}, total: ${o.total})`).join("\n")}

Products (${products.length} found):
${products.map(p => `- ${p.name} (${p.category}, $${p.price})`).join("\n")}
`;
}
