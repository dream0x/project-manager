package com.app.domain.project;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.domain.project.dto.CreateProjectRequest;
import com.app.domain.project.dto.ProjectResponse;
import com.app.domain.project.dto.UpdateProjectRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

  private final ProjectService projectService;

  @PostMapping
  public ProjectResponse create(@RequestBody @Valid CreateProjectRequest project) {
    return projectService.create(project);
  }

  @GetMapping("{id}")
  public ProjectResponse get(@PathVariable("id") Long id) {
    return projectService.get(id);
  }

  @GetMapping
  public List<ProjectResponse> getAll() {
    return projectService.getAll();
  }

  @PatchMapping("{id}")
  public ProjectResponse update(@PathVariable("id") Long id, @RequestBody @Valid UpdateProjectRequest request) {
    return projectService.update(id, request);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable("id") Long id) {
    projectService.delete(id);
  }
}
