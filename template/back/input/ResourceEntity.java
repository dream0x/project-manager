package com.app.domain.resource;

import com.app.domain.resource.dto.CreateResourceRequest;
import com.app.domain.resource.dto.UpdateResourceRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resource")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ResourceEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String name;

  public static ResourceEntity create(CreateResourceRequest request) {
    return ResourceEntity.builder()
        .name(request.getName())
        .build();
  }

  public void update(UpdateResourceRequest request) {
    this.name = request.getName();
  }
}
