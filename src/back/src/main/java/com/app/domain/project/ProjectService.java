package com.app.domain.project;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.domain.project.dto.CreateProjectRequest;
import com.app.domain.project.dto.ProjectResponse;
import com.app.domain.project.dto.UpdateProjectRequest;
import com.app.exception.NotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
  private final ProjectRepository projectRepository;

  private final String RESOURCE_NAME = "Project";

  public ProjectResponse create(CreateProjectRequest request) {
    ProjectEntity createProject = ProjectEntity.create(request);
    ProjectEntity createdProject = projectRepository.save(createProject);
    return ProjectResponse.from(createdProject);
  }

  public ProjectResponse get(Long id) {
    ProjectEntity foundProject = projectRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    return ProjectResponse.from(foundProject);
  }

  public List<ProjectResponse> getAll() {
    return projectRepository.findAll().stream().map(ProjectResponse::from).toList();
  }

  public ProjectResponse update(Long id, UpdateProjectRequest request) {
    ProjectEntity foundProject = projectRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    foundProject.update(request);
    ProjectEntity updatedProject = projectRepository.save(foundProject);
    return ProjectResponse.from(updatedProject);
  }

  public void delete(Long id) {
    projectRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    projectRepository.deleteById(id);
  }
}
