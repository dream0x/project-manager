package com.app.exception;

import jakarta.persistence.EntityNotFoundException;

/**
 * DB取得で対象のリソースが見つからなかった場合に投げられる例外
 * NotFoundException
 */
public class NotFoundException extends EntityNotFoundException {
  public NotFoundException(String resourceName, Long id) {
    String message = String.format("対象の%sが見つかりません：%d", resourceName);
    super(message);
  }
}
