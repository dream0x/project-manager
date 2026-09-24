package com.app.domain.resource;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.domain.resource.dto.CreateResourceRequest;
import com.app.domain.resource.dto.ResourceResponse;
import com.app.domain.resource.dto.UpdateResourceRequest;
import com.app.exception.NotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class ResourceService {
  private final ResourceRepository resourceRepository;

  private final String RESOURCE_NAME = "Resource";

  public ResourceResponse create(CreateResourceRequest request) {
    ResourceEntity createResource = ResourceEntity.create(request);
    ResourceEntity createdResource = resourceRepository.save(createResource);
    return ResourceResponse.from(createdResource);
  }

  public ResourceResponse get(Long id) {
    ResourceEntity foundResource = resourceRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    return ResourceResponse.from(foundResource);
  }

  public List<ResourceResponse> getAll() {
    return resourceRepository.findAll().stream().map(ResourceResponse::from).toList();
  }

  public ResourceResponse update(Long id, UpdateResourceRequest request) {
    ResourceEntity foundResource = resourceRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    foundResource.update(request);
    ResourceEntity updatedResource = resourceRepository.save(foundResource);
    return ResourceResponse.from(updatedResource);
  }

  public void delete(Long id) {
    resourceRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    resourceRepository.deleteById(id);
  }
}
