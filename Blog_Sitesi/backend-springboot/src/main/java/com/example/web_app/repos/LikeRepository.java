package com.example.web_app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.web_app.entities.Like;
import com.example.web_app.requests.LikeCreateRequest;

public interface LikeRepository extends JpaRepository<Like, Long> {

	List<Like> findByPostIdAndUserId(Long postId, Long userId);

	List<Like> findByPostId(Long long1);

	List<Like> findByUserId(Long long1);
	

}
