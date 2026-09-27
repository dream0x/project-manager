package com.app.domain.project;

import com.app.domain.project.dto.CreateProjectRequest;
import com.app.domain.project.dto.UpdateProjectRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ProjectEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String name;

  public static ProjectEntity create(CreateProjectRequest request) {
    return ProjectEntity.builder()
        .name(request.getName())
        .build();
  }

  public void update(UpdateProjectRequest request) {
    this.name = request.getName();
  }
}
