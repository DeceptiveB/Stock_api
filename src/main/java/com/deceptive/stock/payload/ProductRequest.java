package com.deceptive.stock.payload;

import java.util.Optional;
import java.util.Set;

public record ProductRequest(
        String name,
        Integer brand,
        Optional<Set<Integer>> categories,
        String description
) {

}
