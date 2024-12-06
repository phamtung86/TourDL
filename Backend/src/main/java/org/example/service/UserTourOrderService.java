package org.example.service;

import org.example.modal.UserTourOrder;
import org.example.reponsitory.UserTourOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserTourOrderService implements IUserTourOrderService {
	@Autowired
	private UserTourOrderRepository userTourOrderRepository;
	@Override
	public Page<UserTourOrder> pageUTOs(Pageable pageable) {
		
		return userTourOrderRepository.findAll(pageable);
	}

}
