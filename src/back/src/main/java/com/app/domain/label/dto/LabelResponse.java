package com.app.domain.label.dto;

import com.app.domain.label.LabelEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LabelResponse {
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private Long id;
  @Schema(requiredMode = RequiredMode.REQUIRED)
  private String name;

  public static LabelResponse from(LabelEntity entity) {
    return LabelResponse.builder()
        .id(entity.getId())
        .name(entity.getName())
        .build();
  }
}
