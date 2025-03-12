package com.deceptive.stock.payload.entry;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EntryResponse(
        Integer id,
        int quantity,
        @JsonProperty("product") EntryProductResponse entryProductResponse
) {
}
