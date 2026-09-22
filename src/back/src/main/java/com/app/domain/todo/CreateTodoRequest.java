package com.app.domain.todo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTodoRequest {
  @NotBlank
  private String title;
  private String description;
}
