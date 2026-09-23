package com.app.domain.todo;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.domain.todo.dto.CreateTodoRequest;
import com.app.domain.todo.dto.TodoResponse;
import com.app.domain.todo.dto.UpdateTodoRequest;

import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {
  private final TodoRepository todoRepository;

  public TodoResponse create(CreateTodoRequest request) {
    TodoEntity saved = todoRepository.save(new TodoEntity(null, request.getTitle(), request.getDescription(), false));
    return TodoResponse.from(saved);
  }

  public List<TodoResponse> getAll() {
    return todoRepository.findAll().stream().map(TodoResponse::from).toList();
  }

  public TodoResponse update(Long id, UpdateTodoRequest request) {
    TodoEntity todo = todoRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("対象のリソースが見つかりません。" + id));
    todo.update(request.getTitle(), request.getDescription(), request.isCompleted());
    return TodoResponse.from(todoRepository.save(todo));
  }

  public void delete(Long id) {
    todoRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("対象のリソースが見つかりません。" + id));
    todoRepository.deleteById(id);
  }
}
