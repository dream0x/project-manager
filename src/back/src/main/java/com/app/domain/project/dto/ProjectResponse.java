package com.app.domain.project.dto;

import com.app.domain.project.ProjectEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProjectResponse {
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private Long id;
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private String name;

  public static ProjectResponse from(ProjectEntity entity) {
    return ProjectResponse.builder()
        .id(entity.getId())
        .name(entity.getName())
        .build();
  }
}
