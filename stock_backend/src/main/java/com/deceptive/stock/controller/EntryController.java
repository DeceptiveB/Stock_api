package com.deceptive.stock.controller;

import com.deceptive.stock.model.Entry;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.service.EntryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
