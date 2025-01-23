package com.deceptive.stock.service;

import com.deceptive.stock.model.Brand;
import org.springframework.stereotype.Service;

public interface BrandService {
    Brand saveBrand(String name);
}
