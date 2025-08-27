const { rg } = require('./event');
const db = require('./Data');

function createProduct(sku, name, qty = 0, threshold = 2) {
    db[sku] = { name, qty, threshold };
    rg.emit('product:created', { sku, name, qty, threshold });
}

function sell(sku, amount = 1) {
    const item = db[sku];

    if (!item) {
        rg.emit('error', { message: `No product ${sku}` });
        return;
    }
    if (amount <= 0) {
        rg.emit('error', { message: 'Amount must be > 0' });
        return;
    }
    if (item.qty < amount) {
        rg.emit('error', { message: 'Insufficient stock' });
        return;
    }

    item.qty -= amount;
    rg.emit('stock:changed', { sku, qty: item.qty });

    if (item.qty === 0) {
        rg.emit('inventory:out', { sku });
    } else if (item.qty <= item.threshold) {
        rg.emit('inventory:low', { sku, qty: item.qty, threshold: item.threshold });
    }
}

rg.on('product:created', ({ sku, name, qty, threshold }) => {
    console.log(`🆕 Added ${name} (${sku}) qty=${qty}, low<=${threshold}`);
});

rg.on('stock:changed', ({ sku, qty }) => {
    console.log(`🔢 ${sku} stock changed → ${qty}`);
});

rg.on('inventory:low', ({ sku, qty, threshold }) => {
    console.log(`⚠️  ${sku} LOW STOCK (${qty}) ≤ threshold (${threshold}) — reorder soon`);
});

rg.on('inventory:out', ({ sku }) => {
    console.log(`⛔ ${sku} OUT OF STOCK — stop selling`);
});

rg.on('error', ({ message }) => {
    console.log(`❌ ERROR: ${message}`);
});

createProduct('USB-C', 'USB-C Cable', 3, 2);

sell('USB-C', 1);
sell('USB-C', 2);