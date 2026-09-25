package com.app.domain.label;

import com.app.domain.label.dto.CreateLabelRequest;
import com.app.domain.label.dto.UpdateLabelRequest;

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
@Table(name = "label")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class LabelEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String name;

  public static LabelEntity create(CreateLabelRequest request) {
    return LabelEntity.builder()
        .name(request.getName())
        .build();
  }

  public void update(UpdateLabelRequest request) {
    this.name = request.getName();
  }
}
