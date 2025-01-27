package com.deceptive.stock.service;

import com.deceptive.stock.model.Brand;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BrandService {
    Brand saveBrand(String name);

    List<Brand> getAllBrands();
}
