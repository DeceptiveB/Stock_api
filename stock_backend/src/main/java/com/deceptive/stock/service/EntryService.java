package com.deceptive.stock.service;

import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.payload.entry.EntryResponse;

import java.util.Optional;

public interface EntryService {
    Entry addEntry(EntryRequest req);

    PagedResponse<EntryResponse> getEntries(int page, int size);

    EntryResponse getEntryById(Integer id);
}
