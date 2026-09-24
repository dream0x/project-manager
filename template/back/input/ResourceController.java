package com.app.domain.resource;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.domain.resource.dto.CreateResourceRequest;
import com.app.domain.resource.dto.ResourceResponse;
import com.app.domain.resource.dto.UpdateResourceRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/resources")
@RequiredArgsConstructor
public class ResourceController {

  private final ResourceService resourceService;

  @PostMapping
  public ResourceResponse create(@RequestBody @Valid CreateResourceRequest resource) {
    return resourceService.create(resource);
  }

  @GetMapping("{id}")
  public ResourceResponse get(@PathVariable("id") Long id) {
    return resourceService.get(id);
  }

  @GetMapping
  public List<ResourceResponse> getAll() {
    return resourceService.getAll();
  }

  @PatchMapping("{id}")
  public ResourceResponse update(@PathVariable("id") Long id, @RequestBody @Valid UpdateResourceRequest request) {
    return resourceService.update(id, request);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable("id") Long id) {
    resourceService.delete(id);
  }
}
