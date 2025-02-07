package com.deceptive.stock.model;

import com.deceptive.stock.model.audit.UserDateAudit;
import jakarta.persistence.*;

import java.util.Set;

@Table
@Entity
public class Exit extends UserDateAudit {

    @Id
    @SequenceGenerator(
            name = "exit_id_sequence",
            sequenceName = "exit_id_sequence"
    )
    @GeneratedValue(
            generator = "exit_id_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    public Exit() {
    }

    public Exit(Product product, int quantity) {
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
