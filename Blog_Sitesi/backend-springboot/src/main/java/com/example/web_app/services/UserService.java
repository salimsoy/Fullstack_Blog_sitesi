package com.example.web_app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.web_app.entities.User;
import com.example.web_app.repos.UserRepository;

@Service
public class UserService {
	
	UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUser() {
		
		return userRepository.findAll();
	}

	public User saveOneUser(User newUser) {

		return userRepository.save(newUser);
	}

	public User getOneUser(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}

	public User updateOneUpdate(Long userId, User newUser) {
		Optional<User> user = userRepository.findById(userId);
		if(user.isPresent()) {
			User foundUser = user.get();
			foundUser.setUserName(newUser.getUserName());
			foundUser.setPassword( newUser.getPassword());
			
			userRepository.save(foundUser);
			return foundUser;
		}else return null;
	}

	public void deleteOneUser(Long userId) {
		userRepository.deleteById(userId);
		
	}

	public User getOneUserByUserName(String userName) {
		return userRepository.findByUserName(userName); //
	}
	
	
	

}
