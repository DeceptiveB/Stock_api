package com.deceptive.stock.mapper;

import com.deceptive.stock.exception.ResourceNotFoundException;
import com.deceptive.stock.model.Entry;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.entry.EntryRequest;
import com.deceptive.stock.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class EntryRequestMapper implements Function<EntryRequest, Entry> {
    @Autowired
    private ProductRepo productRepo;
    @Override
    public Entry apply(EntryRequest entryRequest) {
        Product product = productRepo.findById(entryRequest.product_id())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product", "Id", entryRequest.product_id()));
        return new Entry(
                product,
                entryRequest.product_id()
        );
    }
}
