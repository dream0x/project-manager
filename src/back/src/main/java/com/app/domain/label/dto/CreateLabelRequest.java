package com.app.domain.label.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateLabelRequest {
  @NotBlank
  private String name;
}
