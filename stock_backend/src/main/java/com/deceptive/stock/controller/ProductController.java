package com.deceptive.stock.controller;

import com.deceptive.stock.mapper.product.ProductResponseMapper;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import com.deceptive.stock.service.ProductService;
import com.deceptive.stock.utils.AppConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductResponseMapper prodResMapper;

    @GetMapping
    public ResponseEntity<PagedResponse<ProductResponse>> getProducts(
            @RequestParam Map<String, String> params,
            @RequestParam(value = "page",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(value = "size",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size){
        return ResponseEntity.ok().body(productService.getAllProducts(params, page, size));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(
            @PathVariable(value = "id") Integer id
                                            ){
        return ResponseEntity.ok().body(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> save(
            @RequestParam("data") String productRequest,
            @RequestParam("image") MultipartFile image
                                              ) throws JsonProcessingException {
        //return ResponseEntity.ok().body("Hi");
        ProductRequest productReq = convertToProductRequest(productRequest);
        return ResponseEntity.ok().body(productService.saveProduct(productReq, image));
    }

    private ProductRequest convertToProductRequest(String prodReq) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return  objectMapper.readValue(prodReq, ProductRequest.class);
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<PagedResponse<ProductResponse>> getProductsByBrand(
            @RequestParam(value = "page",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(value = "size",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
            @PathVariable(name = "id") Integer id
                                                                            ){
        return ResponseEntity.ok().body(productService.getProductsByBrand(page, size, id));
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<PagedResponse<ProductResponse>> getProductsByCategory(
            @RequestParam(value = "page",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(value = "size",
                          required = false,
                          defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
            @PathVariable(name = "id") Integer id
    ){
        return ResponseEntity.ok().body(productService.getProductsByCategory(page, size, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable(value = "id") Integer id
                                             ){
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable("id") Integer id,
            @RequestParam("data") String productRequest,
            @RequestParam(value = "image", required = false) MultipartFile image
                                                        ) throws JsonProcessingException {
        ProductRequest productReq = convertToProductRequest(productRequest);
        Product product = productService.updateProduct(id, productReq, image);
        ProductResponse productResponse = prodResMapper.apply(product);
        return ResponseEntity.ok().body(productResponse);
    }
}