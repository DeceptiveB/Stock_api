package com.deceptive.stock.payload.entry;

public record EntryResponse(
        int quantity,
        EntryProductResponse entryProductResponse
) {
}
