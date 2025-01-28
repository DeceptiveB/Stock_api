package com.deceptive.stock.controller;

import com.deceptive.stock.model.Brand;
import com.deceptive.stock.service.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @PostMapping
    private ResponseEntity<Brand> saveBrando(
            @Valid @RequestBody Brand brand){
        return ResponseEntity.ok().body(brandService.saveBrand(brand.getName()));
    }

    @GetMapping
    private ResponseEntity<List<Brand>> getBrands(){
        return ResponseEntity.ok().body(brandService.getAllBrands());
    }
}
