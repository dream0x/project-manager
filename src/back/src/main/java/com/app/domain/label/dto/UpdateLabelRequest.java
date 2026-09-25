package com.app.domain.label.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class UpdateLabelRequest {
  @NotBlank
  private String name;
}
