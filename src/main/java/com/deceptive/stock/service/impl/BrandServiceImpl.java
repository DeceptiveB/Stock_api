package com.deceptive.stock.service.impl;

import com.deceptive.stock.model.Brand;
import com.deceptive.stock.repo.BrandRepo;
import com.deceptive.stock.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private BrandRepo brandRepo;
    @Override
    public Brand saveBrand(String name) {
        Brand brand = new Brand(name);
        return this.brandRepo.save(brand);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepo.findAll();
    }
}
