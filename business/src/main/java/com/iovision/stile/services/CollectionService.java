package com.iovision.stile.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.Collection;
import com.iovision.stile.entities.CollectionGroup;
import com.iovision.stile.entities.User;
import com.iovision.stile.repositories.ClothRepository;
import com.iovision.stile.repositories.CollectionGroupRepository;
import com.iovision.stile.repositories.CollectionRepository;
import com.iovision.stile.repositories.UserRepository;
import com.iovision.stile.services.security.services.UserDetailsImpl;

@Service
public class CollectionService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	CollectionGroupRepository collectionGroupRepo;

	@Autowired
	CollectionRepository collectionRepo;

	@Autowired
	ClothRepository clothRepo;

	@Autowired
	ClothRepository clothRepository;

	@Autowired
	UserRepository UserRepo;

	public Set<CollectionGroup> getCollectionGroupByUser() {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return this.collectionGroupRepo.getCollectionGroupByUser(c.getId());
	}

	public void addItemToCollection(Long id, Integer clothId) {
		Cloth cloth = clothRepo.findById(clothId);
		UserDetailsImpl userImpl = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		User user = userRepository.findById(userImpl.getId()).get();
		CollectionGroup collectionGroup = collectionGroupRepo.findById(id).get();
		Collection c = new Collection();
		c.setCloth(cloth);
		c.setUser(user);
		c.setCollectionGroup(collectionGroup);

		this.collectionRepo.save(c);
	}

	public void addCollectionGroupWithItem(String name, Integer clothId) {
		Cloth cloth = clothRepo.findById(clothId);

		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();
		CollectionGroup collectionGroup = new CollectionGroup();
		collectionGroup.setCollectionName(name);
		collectionGroup.setUser(user);
		collectionGroupRepo.saveAndFlush(collectionGroup);
		Collection collection = new Collection();
		collection.setCloth(cloth);
		collection.setUser(user);
		collection.setCollectionGroup(collectionGroup);
		this.collectionRepo.save(collection);
	}

	public Set<Collection> checkItemExist(Integer clothId) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		return collectionRepo.checkItemExist(clothId, c.getId());
	}

	public void deleteItemFromCollection(Integer clothId) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		collectionRepo.deleteItemFromCollection(clothId, c.getId());
	}

	public void deleteCollectionGroup(Long id, String name) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		collectionGroupRepo.deleteItemFromCollection(id, name, c.getId());
	}

	public void modifyCollectionGroupName(Long id, String oldName, String newName) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		collectionGroupRepo.modifyCollectionGroupName(newName, c.getId(), id);
		// ,oldName
	}

	public void addCollectionGroup(String name) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();
		CollectionGroup collectionGroup = new CollectionGroup();
		collectionGroup.setUser(user);
		collectionGroup.setCollectionName(name);
		collectionGroupRepo.saveAndFlush(collectionGroup);

	}

	public void changeItemCollection(Long id, Long collectionId) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		collectionRepo.changeItemCollection(id, c.getId(), collectionId);

	}

	public void changeItemToNewCollection(String name, Long collectionId) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();
		CollectionGroup collectionGroup = new CollectionGroup();
		collectionGroup.setUser(user);
		collectionGroup.setCollectionName(name);
		collectionGroupRepo.saveAndFlush(collectionGroup);
		collectionRepo.changeItemCollection(collectionGroup.getId(), c.getId(), collectionId);
	}

	/*
	 * 
	 * public void addToCollections(Integer id) { UserDetailsImpl c =
	 * (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal(); User
	 * user = userRepository.findByUsername(c.getUsername()).get(); Set<Cloth>
	 * collection = userRepository.findCollectionByUser(user);
	 * collection.add(clothRepository.findById(id)); //
	 * user.setCollectionClothes(collection); userRepository.save(user); }
	 * 
	 * public void removeFromCollections(Integer id) { UserDetailsImpl c =
	 * (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal(); User
	 * user = userRepository.findByUsername(c.getUsername()).get(); Set<Cloth>
	 * collection = userRepository.findCollectionByUser(user);
	 * collection.remove(clothRepository.findById(id)); //
	 * user.setCollectionClothes(collection); userRepository.save(user);
	 * 
	 * }
	 * 
	 * public boolean checkCollectionsStatus(Integer id) { UserDetailsImpl c =
	 * (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal(); User
	 * user = userRepository.findByUsername(c.getUsername()).get(); Set<Cloth>
	 * collection = userRepository.findCollectionByUser(user); return
	 * collection.contains(clothRepository.findById(id));
	 * 
	 * 
	 * }
	 * 
	 * public Set<Cloth> findCollectionByUser() { UserDetailsImpl c =
	 * (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal(); User
	 * user = userRepository.findByUsername(c.getUsername()).get(); return
	 * userRepository.findCollectionByUser(user); }
	 * 
	 */

}
