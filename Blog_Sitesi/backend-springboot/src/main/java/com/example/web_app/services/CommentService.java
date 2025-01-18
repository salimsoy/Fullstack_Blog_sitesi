package com.example.web_app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web_app.entities.Comment;
import com.example.web_app.entities.Post;
import com.example.web_app.entities.User;
import com.example.web_app.repos.CommentRepository;
import com.example.web_app.requests.CommentCreateRequest;
import com.example.web_app.requests.CommentUpdateRequest;
import com.example.web_app.responses.CLikeResponse;
import com.example.web_app.responses.CommentResponse;
import com.example.web_app.responses.LikeResponse;
@Service
public class CommentService {
	private CommentRepository commentRepository;
	private UserService userService;
	private PostService postService;
	private CLikeService cLikeService;

	public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
		this.commentRepository = commentRepository;
		this.userService = userService;
		this.postService = postService;
	}
	@Autowired
	public void setCLikeService(CLikeService cLikeService) {
		this.cLikeService=cLikeService;
	}



	public List<CommentResponse> getAllComment(Optional<Long> postId, Optional<Long> userId) {
		List<Comment> comment;
	    if (userId.isPresent() && postId.isPresent()) {
	        comment= commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
	    } else if (userId.isPresent()) {
	    	comment= commentRepository.findByUserId(userId.get());
	    } else if (postId.isPresent()) {
	    	comment= commentRepository.findByPostId(postId.get());
	    }else {
	    comment= commentRepository.findAll();}
	    
	    return comment.stream().map(list -> {
	    	List<CLikeResponse> likes = cLikeService.getAllCLikes(Optional.of(list.getId()),  Optional.empty());
	    	return new CommentResponse(list,likes);}).collect(Collectors.toList());
	}

	public Comment createOneComment(CommentCreateRequest newCommentRequest) {
		User user= userService.getOneUser(newCommentRequest.getUserId());
		 Post post=postService.getOnePostById(newCommentRequest.getPostId());
		 if(user==null)
			   return null;
		 if(post==null)
			   return null;
		 Comment toSave =new Comment();
		 toSave.setId(newCommentRequest.getId());
		 toSave.setText(newCommentRequest.getText());
		 toSave.setPost(post);
		 toSave.setUser(user);
		 
		 return commentRepository.save(toSave);
		 
	}

	public Comment getOneComment(Long commentId) {
		return commentRepository.findById(commentId).orElse(null);
	}



	public Comment updateOneComment(Long commentId, CommentUpdateRequest updateComment) {
		Optional <Comment> comment=commentRepository.findById(commentId);
		if(comment.isPresent()) {
			Comment toUpdate=comment.get();
			toUpdate.setText(updateComment.getText());
			return commentRepository.save(toUpdate);
		}
		return null;
	}



	public void deleteOneComment(Long commentId) {
		commentRepository.deleteById(commentId);
		
	}
	
	
	
	
	
	


	
	
	
	

}
