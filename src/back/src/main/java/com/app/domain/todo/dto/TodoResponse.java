package com.app.domain.todo.dto;

import com.app.domain.todo.TodoEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
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
    return TodoResponse.builder()
        .id(entity.getId())
        .title(entity.getTitle())
        .description(entity.getDescription())
        .completed(entity.isCompleted())
        .build();
  }
}
