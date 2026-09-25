package com.app.domain.label;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.domain.label.dto.CreateLabelRequest;
import com.app.domain.label.dto.LabelResponse;
import com.app.domain.label.dto.UpdateLabelRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/labels")
@RequiredArgsConstructor
public class LabelController {

  private final LabelService labelService;

  @PostMapping
  public LabelResponse create(@RequestBody @Valid CreateLabelRequest label) {
    return labelService.create(label);
  }

  @GetMapping("{id}")
  public LabelResponse get(@PathVariable("id") Long id) {
    return labelService.get(id);
  }

  @GetMapping
  public List<LabelResponse> getAll() {
    return labelService.getAll();
  }

  @PatchMapping("{id}")
  public LabelResponse update(@PathVariable("id") Long id, @RequestBody @Valid UpdateLabelRequest request) {
    return labelService.update(id, request);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable("id") Long id) {
    labelService.delete(id);
  }
}
