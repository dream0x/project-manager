package com.app.domain.todo.dto;

import java.util.List;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateTodoRequest {
  @NotBlank
  private String title;
  @NotNull
  private String description;
  @NotNull
  private Boolean completed;
  private List<Long> labelIds;
}
