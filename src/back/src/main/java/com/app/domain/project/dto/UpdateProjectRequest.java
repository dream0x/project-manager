package com.app.domain.project.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class UpdateProjectRequest {
  @NotBlank
  private String name;
}
