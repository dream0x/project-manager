package com.app.domain.todo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.domain.label.LabelEntity;
import com.app.domain.label.LabelRepository;
import com.app.domain.todo.dto.CreateTodoRequest;
import com.app.domain.todo.dto.TodoResponse;
import com.app.domain.todo.dto.UpdateTodoRequest;
import com.app.exception.NotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {
  private final TodoRepository todoRepository;
  private final LabelRepository labelRepository;

  private final String RESOURCE_NAME = "Todo";

  public TodoResponse create(CreateTodoRequest request) {
    Set<LabelEntity> labels = getAllLabelById(request.getLabelIds());
    TodoEntity createTodo = TodoEntity.create(request, labels);
    TodoEntity createdTodo = todoRepository.save(createTodo);
    return TodoResponse.from(createdTodo);
  }

  public TodoResponse get(Long id) {
    TodoEntity foundTodo = todoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    return TodoResponse.from(foundTodo);
  }

  public List<TodoResponse> getAll() {
    return todoRepository.findAll().stream().map(TodoResponse::from).toList();
  }

  public TodoResponse update(Long id, UpdateTodoRequest request) {
    TodoEntity foundTodo = todoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    Set<LabelEntity> labels = getAllLabelById(request.getLabelIds());
    foundTodo.update(request, labels);
    TodoEntity updatedTodo = todoRepository.save(foundTodo);
    return TodoResponse.from(updatedTodo);
  }

  public void delete(Long id) {
    todoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    todoRepository.deleteById(id);
  }

  private Set<LabelEntity> getAllLabelById(List<Long> labelIds) {
    if (labelIds == null || labelIds.isEmpty()) {
      return new HashSet<>();
    }
    return new HashSet<>(labelRepository.findAllById(labelIds));
  }
}
