package com.app.domain.todo.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateTodoRequest {
  @NotBlank
  private String title;
  @NotBlank
  private String description;
  @NotNull
  private Boolean completed;
}
