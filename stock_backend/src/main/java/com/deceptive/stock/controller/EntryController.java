package com.deceptive.stock.controller;

import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.payload.entry.EntryResponse;
import com.deceptive.stock.service.EntryService;
import com.deceptive.stock.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entry")
public class EntryController {
    @Autowired
    private EntryService entryService;

    @PostMapping
    public ResponseEntity<Entry> save(
            @Valid @RequestBody EntryRequest entryReq){
        return ResponseEntity.ok().body(entryService.addEntry(entryReq));
    }

    @GetMapping
    public ResponseEntity<PagedResponse<EntryResponse>> save(
            @RequestParam(value = "page",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(value = "size",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size){
        return ResponseEntity.ok().body(entryService.getEntries(page, size));
    }
}
