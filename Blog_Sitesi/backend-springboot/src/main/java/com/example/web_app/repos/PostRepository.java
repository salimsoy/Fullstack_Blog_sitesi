package com.example.web_app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.web_app.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

	List<Post> findByUserId(Long userId);
	

}
