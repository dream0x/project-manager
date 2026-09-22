package com.app.domain.todo;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {
  private final TodoRepository todoRepository;

  public TodoEntity create(CreateTodoRequest request) {
    return todoRepository.save(new TodoEntity(null, request.getTitle(), request.getDescription(), false));
  }

  public List<TodoEntity> getAll() {
    return todoRepository.findAll();
  }

  public TodoEntity update(Long id, UpdateTodoRequest request) {
    TodoEntity todo = todoRepository.findById(id).orElseThrow();
    todo.setTitle(request.getTitle());
    todo.setDescription(request.getDescription());
    todo.setCompleted(request.isCompleted());
    return todoRepository.save(todo);
  }

  public void delete(Long id) {
    todoRepository.deleteById(id);
  }
}
