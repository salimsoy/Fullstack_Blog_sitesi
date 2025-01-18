package com.example.web_app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.web_app.entities.Comment;
import com.example.web_app.requests.CommentCreateRequest;
import com.example.web_app.requests.CommentUpdateRequest;
import com.example.web_app.responses.CommentResponse;
import com.example.web_app.services.CommentService;

@RestController
@RequestMapping("/comments")
public class CommentController {
	private CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}
	@GetMapping
	public List<CommentResponse> getAllComment(@RequestParam Optional<Long> postId,@RequestParam Optional<Long> userId){
		return commentService.getAllComment(postId,userId);
	}
	@PostMapping
	public Comment createOneComment (@RequestBody CommentCreateRequest newCommentRequest) {
		return commentService.createOneComment(newCommentRequest);
	}
	@GetMapping("/{commentId}")
	public Comment getOneComment(@PathVariable  Long commentId) {
		return commentService.getOneComment(commentId);
		
	}
	
	@PutMapping("/{commentId}")
	public Comment updateOneComment (@PathVariable  Long commentId,@RequestBody CommentUpdateRequest updateComment) {
		return commentService.updateOneComment(commentId,updateComment);
		
	}
	
	@DeleteMapping("/{commentId}")
	public void deleteOneComment(@PathVariable  Long commentId) {
		commentService.deleteOneComment(commentId);
	}
	
	

}
