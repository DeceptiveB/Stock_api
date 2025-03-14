package com.deceptive.stock.payload.product;

import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.Set;

public record ProductRequest(
        String name,
        String brand,
        Optional<Set<Integer>> categories,
        String description,
        MultipartFile image
) {

}
