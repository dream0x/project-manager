package com.app.domain.todo.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class UpdateTodoRequest {
  @NotBlank
  private String title;
  @NotBlank
  private String description;
  @NotBlank
  private boolean completed;
}
