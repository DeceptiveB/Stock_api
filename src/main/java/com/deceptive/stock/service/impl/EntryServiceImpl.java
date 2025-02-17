package com.deceptive.stock.service.impl;

import com.deceptive.stock.mapper.EntryRequestMapper;
import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.repo.EntryRepo;
import com.deceptive.stock.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EntryServiceImpl implements EntryService {

    @Autowired
    private EntryRepo entryRepo;

    @Autowired
    private EntryRequestMapper entryReqMaper;

    @Override
    public Entry addEntry(EntryRequest req) {
        Entry entry = entryReqMaper.apply(req);
        return entryRepo.save(entry);
    }
}
