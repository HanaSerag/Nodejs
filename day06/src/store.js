// An order: { id, customer, item, qty, status }   status ∈ "new" | "paid" | "packed" | "shipped" | "canceled"
let nextId = 1;
const orders = [];
function createOrder(customer, item, qty) {
    // validate inputs (non-empty customer/item, qty > 0)
    // If invalid, return { ok:false, error:"message" }
    // Create a new order with the following properties:
    // id: nextId++,
    // customer: customer.trim(),
    // item: item.trim(),
    // qty: Number(qty),
    // status: "new"
    // Add the order to the orders array
    // Return { ok:true, order }
    if (!customer || !customer.trim()) {
        return { ok: false, error: "Customer not found" };
    }
    if (!item || !item.trim()) {
        return { ok: false, error: "Item not found" };
    }
    const nQty = Number(qty);
    if (!Number.isFinite(nQty) || nQty <= 0) {
        return { ok: false, error: "Quantity must be > 0" };
    }
    const order = {
        id: nextId++,
        customer: customer.trim(),
        item: item.trim(),
        qty: nQty,
        status: "new"
    };
    orders.push(order);
    return { ok: true, order: { id: order.id, customer: order.customer, item: order.item, qty: order.qty, status: order.status } };

}

function findById(id) {
    // classic loop to find the order by id from the orders array
    // Return the order if found, otherwise return null
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === id) {
            return orders[i];
        }
    }
    return null;
}

function list() {
    // return a shallow copy of the orders array
    return orders.slice();
}

function setStatus(id, newStatus) {
    // find the order by id from the orders array
    // if the order is not found, return { ok: false, error: "Order not found" }
    // if the order is found, update the status of the order to the newStatus
    // return { ok: true, order }
    const order = findById(id);
    if (!order) {
        return { ok: false, error: "Order not found" };
    }
    order.status = newStatus;
    return { ok: true, order };

}

// export the functions to be used in the application
module.exports = { createOrder, findById, list, setStatus };