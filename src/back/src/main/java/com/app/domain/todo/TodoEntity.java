package com.app.domain.todo;

import com.app.domain.todo.dto.CreateTodoRequest;
import com.app.domain.todo.dto.UpdateTodoRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "todos")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class TodoEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String title;
  private String description;
  private boolean completed;

  // 作成
  public static TodoEntity create(CreateTodoRequest request) {
    return TodoEntity.builder()
        .title(request.getTitle())
        .description(request.getDescription())
        .completed(false)
        .build();
  }

  // 更新
  public void update(UpdateTodoRequest request) {
      this.title = request.getTitle();
      this.description = request.getDescription();
      this.completed = request.getCompleted();
  }
}
