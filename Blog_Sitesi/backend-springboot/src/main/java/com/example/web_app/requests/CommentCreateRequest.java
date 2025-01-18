package com.example.web_app.requests;

import lombok.Data;

@Data
public class CommentCreateRequest {
	Long id;
	Long userId;
	Long postId;
	String text;
	

}
