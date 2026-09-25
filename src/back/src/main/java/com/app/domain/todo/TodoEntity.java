package com.app.domain.todo;

import java.util.HashSet;
import java.util.Set;

import com.app.domain.label.LabelEntity;
import com.app.domain.todo.dto.CreateTodoRequest;
import com.app.domain.todo.dto.UpdateTodoRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "todo")
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

  @ManyToMany
  @JoinTable(name = "todo_label", joinColumns = @JoinColumn(name = "todo_id"), inverseJoinColumns = @JoinColumn(name = "label_id"))
  @Builder.Default
  private Set<LabelEntity> labels = new HashSet<>();

  // 作成
  public static TodoEntity create(CreateTodoRequest request, Set<LabelEntity> labels) {
    return TodoEntity.builder()
        .title(request.getTitle())
        .description(request.getDescription())
        .completed(false)
        .labels(labels)
        .build();
  }

  // 更新 (labels が null の場合はラベルの紐付けを変更しない)
  public void update(UpdateTodoRequest request, Set<LabelEntity> labels) {
    this.title = request.getTitle();
    this.description = request.getDescription();
    this.completed = request.getCompleted();
    this.labels = labels;
  }
}
