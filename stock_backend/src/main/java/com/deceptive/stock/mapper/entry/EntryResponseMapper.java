package com.deceptive.stock.mapper.entry;

import com.deceptive.stock.exception.ResourceNotFoundException;
import com.deceptive.stock.model.Entry;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.entry.EntryProductResponse;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.payload.entry.EntryResponse;
import com.deceptive.stock.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class EntryResponseMapper implements Function<Entry, EntryResponse> {
    @Autowired
    private ProductRepo productRepo;

    @Override
    public EntryResponse apply(Entry entry) {
        EntryProductResponse product =
                new EntryProductResponse(
                        entry.getProduct().getId(),
                        entry.getProduct().getName());
        return new EntryResponse(
                entry.getId(),
                entry.getQuantity(),
                product
        );
    }
}

