package com.example.web_app.responses;

import java.util.List;

import com.example.web_app.entities.Comment;

import lombok.Data;

@Data
public class CommentResponse {
	Long id;
	String userName;
	Long userId;
	String text;
	List<CLikeResponse> commentLike;
	
	
	public CommentResponse(Comment comment,List<CLikeResponse> likes) {
		this.id = comment.getId();
		this.userName = comment.getUser().getUserName();
		this.text = comment.getText();
		this.userId=comment.getUser().getId();
		this.commentLike=likes;
	}
	
	

}
