package com.app.domain.todo;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class UpdateTodoRequest {
  @NotBlank
  private String title;
  private String description;
  private boolean completed;
}
