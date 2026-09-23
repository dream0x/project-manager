package com.app.domain.todo.dto;

import com.app.domain.todo.TodoEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.Data;

@Data
public class TodoResponse {
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private Long id;
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private String title;
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private String description;
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private boolean completed;

  public static TodoResponse from(TodoEntity entity) {
    TodoResponse response = new TodoResponse();
    response.setId(entity.getId());
    response.setTitle(entity.getTitle());
    response.setDescription(entity.getDescription());
    response.setCompleted(entity.isCompleted());
    return response;
  }
}
