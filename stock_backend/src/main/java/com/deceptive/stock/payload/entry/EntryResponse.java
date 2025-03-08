package com.deceptive.stock.payload.entry;

public record EntryResponse(
        Integer id,
        int quantity,
        EntryProductResponse entryProductResponse
) {
}
