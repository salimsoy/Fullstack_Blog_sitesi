package com.example.web_app.controllers;

import java.util.List;



import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.web_app.entities.User;
import com.example.web_app.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	@GetMapping
	public List<User> getAllUsers(){
		return userService.getAllUser();
	}
	@PostMapping
	public User createUser(@RequestBody User newUser) {
		
		return userService.saveOneUser(newUser);
		
	}

	@GetMapping("/{userId}")
	public User  getOneUser(@PathVariable Long userId) {
		return userService.getOneUser(userId);
	}
	@PutMapping("/{userId}")
	public User updateOneUser(@PathVariable Long userId,@RequestBody User newUser) {
		return userService.updateOneUpdate(userId,newUser);
	}
	@DeleteMapping("/{userId}")
	public void deleteOneUser(@PathVariable Long userId) {
			userService.deleteOneUser(userId);
			
		
		
		}
		
		
	
}
