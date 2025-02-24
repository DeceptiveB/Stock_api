package com.deceptive.stock.service;

import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.entry.EntryRequest;

import java.util.Optional;

public interface EntryService {
    Entry addEntry(EntryRequest req);
}
