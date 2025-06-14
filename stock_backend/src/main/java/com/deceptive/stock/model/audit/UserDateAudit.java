package com.deceptive.stock.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import java.time.Instant;

@MappedSuperclass
@JsonIgnoreProperties(
        value = { "createdBY", "updatedBy" },
        allowGetters = true
)
public abstract class UserDateAudit extends DateAudit{
    private static final long serialVersionUID = 1L;

    @CreatedBy
    @Column(updatable = false)
    private Integer createdBy;

    @LastModifiedBy
    private Integer updatedBy;


    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }
}
