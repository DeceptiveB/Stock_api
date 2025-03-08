
package com.deceptive.stock.service.impl;

import com.deceptive.stock.exception.ResourceNotFoundException;
import com.deceptive.stock.mapper.entry.EntryRequestMapper;
import com.deceptive.stock.mapper.entry.EntryResponseMapper;
import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.payload.entry.EntryResponse;
import com.deceptive.stock.repo.EntryRepo;
import com.deceptive.stock.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntryServiceImpl implements EntryService {

    @Autowired
    private EntryRepo entryRepo;

    @Autowired
    private EntryRequestMapper entryReqMaper;

    @Autowired
    private EntryResponseMapper entryResMaper;

    @Override
    public Entry addEntry(EntryRequest req) {
        Entry entry = entryReqMaper.apply(req);
        return entryRepo.save(entry);
    }

    @Override
    public PagedResponse<EntryResponse> getEntries(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Entry> pageEntry =  entryRepo.findAll(pageable);
        List<EntryResponse> entryList = pageEntry.
                stream().
                map(entry -> entryResMaper.apply(entry))
                .toList();
        return new PagedResponse<>(entryList,
                                   pageEntry.getNumber(),
                                   pageEntry.getSize(),
                                   pageEntry.getTotalElements(),
                                   pageEntry.getTotalPages(),
                                   pageEntry.isLast());
    }

    @Override
    public EntryResponse getEntryById(Integer id) {
        Entry entry = entryRepo.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Entry", "Id", id));
        return entryResMaper.apply(entry);
    }
}
