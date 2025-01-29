package com.deceptive.stock.payload.product;

import java.util.Optional;
import java.util.Set;

public record ProductRequest(
        String name,
        String brand,
        Optional<Set<Integer>> categories,
        String description
) {

}
