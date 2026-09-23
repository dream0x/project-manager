package com.app.domain.todo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.domain.todo.dto.CreateTodoRequest;
import com.app.domain.todo.dto.TodoResponse;
import com.app.domain.todo.dto.UpdateTodoRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {

  private final TodoService todoService;

  @PostMapping
  public TodoResponse create(@RequestBody @Valid CreateTodoRequest todo) {
    return todoService.create(todo);
  }

  @GetMapping("{id}")
  public TodoResponse get(@PathVariable("id") Long id) {
    return todoService.get(id);
  }

  @GetMapping
  public List<TodoResponse> getAll() {
    return todoService.getAll();
  }

  @PatchMapping("{id}")
  public TodoResponse update(@PathVariable("id") Long id, @RequestBody @Valid UpdateTodoRequest request) {
    return todoService.update(id, request);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable("id") Long id) {
    todoService.delete(id);
  }
}
