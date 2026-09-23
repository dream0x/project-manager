package com.app.domain.todo;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.domain.todo.dto.CreateTodoRequest;
import com.app.domain.todo.dto.TodoResponse;
import com.app.domain.todo.dto.UpdateTodoRequest;
import com.app.exception.NotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {
  private final TodoRepository todoRepository;

  private final String RESOURCE_NAME = "Todo";

  public TodoResponse create(CreateTodoRequest request) {
    TodoEntity createTodo = TodoEntity.create(request);
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
    foundTodo.update(request);
    TodoEntity updatedTodo = todoRepository.save(foundTodo);
    return TodoResponse.from(updatedTodo);
  }

  public void delete(Long id) {
    todoRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(RESOURCE_NAME, id));
    todoRepository.deleteById(id);
  }
}
