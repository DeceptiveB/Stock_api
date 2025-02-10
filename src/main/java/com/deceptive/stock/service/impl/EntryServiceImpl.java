package com.deceptive.stock.service.impl;

import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.service.EntryService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EntryServiceImpl implements EntryService {

    @Override
    public Optional<Entry> addEntry(EntryRequest req) {
        return Optional.empty();
    }
}
