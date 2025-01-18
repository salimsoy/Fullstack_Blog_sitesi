package com.example.web_app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.web_app.entities.CLike;

public interface CLikeRepository extends JpaRepository<CLike, Long> {

	List<CLike> findByCommentIdAndUserId(Long commentId, Long userId);

	List<CLike> findByCommentId(Long commentId);

	List<CLike> findByUserId(Long userId);

}
