package com.deceptive.stock.entry;

import com.deceptive.stock.controller.EntryController;
import com.deceptive.stock.exception.ResourceNotFoundException;
import com.deceptive.stock.model.Entry;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.repo.ProductRepo;
import com.deceptive.stock.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EntryController.class)
public class EntryTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private ProductRepo prodRepo;

    @Test
    void testCreateEntry_Success() throws Exception {
        Product prod = prodRepo.findById(1)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", 1));
        Entry entry = new Entry(prod,7);
        this.mockMvc.perform(post("/api/entry")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(prod)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.quantity").value(7))
                .andExpect(jsonPath("$.product.name").value("Monitor"));
    }
}
