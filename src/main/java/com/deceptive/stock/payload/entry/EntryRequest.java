package com.deceptive.stock.payload.entry;

public record EntryRequest(
        Integer product_id,
        int quantity
) {
}
