package com.deceptive.stock.model;

import jakarta.persistence.*;

import java.util.Set;

@Table
@Entity
public class Entry{
    @Id
    @SequenceGenerator(
            name = "entry_id_sequence",
            sequenceName = "exit_id_sequence"
    )
    @GeneratedValue(
            generator = "entry_id_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    public Entry() {
    }

    public Entry(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
