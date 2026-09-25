package com.app.domain.label;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.domain.label.dto.CreateLabelRequest;
import com.app.domain.label.dto.LabelResponse;
import com.app.domain.label.dto.UpdateLabelRequest;
import com.app.exception.NotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class LabelService {
  private final LabelRepository labelRepository;

  private final String RESOURCE_NAME = "Label";

  public LabelResponse create(CreateLabelRequest request) {
    LabelEntity createLabel = LabelEntity.create(request);
    LabelEntity createdLabel = labelRepository.save(createLabel);
    return LabelResponse.from(createdLabel);
  }

  public LabelResponse get(Long id) {
    LabelEntity foundLabel = labelRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    return LabelResponse.from(foundLabel);
  }

  public List<LabelResponse> getAll() {
    return labelRepository.findAll().stream().map(LabelResponse::from).toList();
  }

  public LabelResponse update(Long id, UpdateLabelRequest request) {
    LabelEntity foundLabel = labelRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    foundLabel.update(request);
    LabelEntity updatedLabel = labelRepository.save(foundLabel);
    return LabelResponse.from(updatedLabel);
  }

  public void delete(Long id) {
    labelRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    labelRepository.deleteById(id);
  }
}
