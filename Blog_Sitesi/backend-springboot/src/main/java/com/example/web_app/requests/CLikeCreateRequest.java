package com.example.web_app.requests;

import lombok.Data;

@Data
public class CLikeCreateRequest {
	Long id;
	Long userId;
	Long commentId;

}
