package com.deceptive.stock.controller;

import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import com.deceptive.stock.service.ProductService;
import com.deceptive.stock.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<List<Product>> getProducts(
            @PathVariable(value = "id") String id
                                            ){
        return ResponseEntity.ok().body(productService.getAllProducts());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(
            @PathVariable(value = "id") Integer id
                                            ){
        return ResponseEntity.ok().body(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> save(
            @Valid @RequestBody ProductRequest productRequest
                                              ){
        return ResponseEntity.ok().body(productService.saveProduct(productRequest));
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<PagedResponse<ProductResponse>> getProductsByBrand(
            @RequestParam(value = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(value = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
            @PathVariable(name = "id") Integer id
                                                                            ){
        return ResponseEntity.ok().body(productService.getProductsByBrand(page, size, id));
    }
}