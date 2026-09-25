package com.app.domain.todo.dto;

import java.util.List;

import com.app.domain.label.dto.LabelResponse;
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
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private List<LabelResponse> labels;

  public static TodoResponse from(TodoEntity entity) {
    return TodoResponse.builder()
        .id(entity.getId())
        .title(entity.getTitle())
        .description(entity.getDescription())
        .completed(entity.isCompleted())
        .labels(entity.getLabels().stream().map(LabelResponse::from).toList())
        .build();
  }
}
