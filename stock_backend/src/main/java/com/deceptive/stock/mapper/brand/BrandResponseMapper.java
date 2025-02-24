package com.deceptive.stock.mapper.brand;

import com.deceptive.stock.model.Brand;
import com.deceptive.stock.payload.brand.BrandResponse;

import java.util.function.Function;

public class BrandResponseMapper implements Function<Brand, BrandResponse> {
    @Override
    public BrandResponse apply(Brand brand) {
        return new BrandResponse(
                brand.getId(),
                brand.getName()
        );
    }
}
