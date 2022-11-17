package com.iovision.stile.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.OutfitGroup;
import com.iovision.stile.entities.Outfits;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.projection.OutfitGroupProjection;
import com.iovision.stile.entities.projection.OutfitProjection;
import com.iovision.stile.repositories.ClothRepository;
import com.iovision.stile.repositories.CollectionRepository;
import com.iovision.stile.repositories.OutfitRepository;
import com.iovision.stile.repositories.OutfitsGroupRepository;
import com.iovision.stile.repositories.UserRepository;
import com.iovision.stile.repositories.WardrobeRepository;
import com.iovision.stile.services.security.services.UserDetailsImpl;

@Service
public class OutfitService {
	@Autowired
	OutfitRepository outfitRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ClothRepository clothRepository;

	@Autowired
	WardrobeRepository wardrobeRepo;

	@Autowired
	ClothRepository ClothRepo;
	CollectionRepository collectionRepo;

	@Autowired
	OutfitsGroupRepository outfitsGroupRepos;

	/*
	 * public Set<Outfits> findOutfitsByUser(){ UserDetailsImpl c =
	 * (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal(); User
	 * user = userRepository.findByUsername(c.getUsername()).get(); Set<Outfits>
	 * outfits = outfitRepository.findOutfitsByUser(user.getId()); return outfits; }
	 * public void addOutfit(Integer topId, Integer bottomId, Integer footwearId) {
	 * UserDetailsImpl c = (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal(); User
	 * user = userRepository.findByUsername(c.getUsername()).get(); Set<Outfit>
	 * outfits = outfitRepository.findOutfitsByUser(user.getId()); Outfit outfit=
	 * new Outfit(); Cloth top = clothRepository.findById(topId);
	 * outfit.setTop(top); if(bottomId!=null) { Cloth bottom =
	 * clothRepository.findById(bottomId); outfit.setBottom(bottom); } Cloth
	 * footwear = clothRepository.findById(footwearId);
	 * outfit.setFootwear(footwear); outfit.setUser(user); outfits.add(outfit);
	 * outfitRepository.save(outfit); } public void removeOutfit(Long id) {
	 * outfitRepository.deleteById(id); }
	 */

	public List<OutfitGroup> getAllUsersOutfits() {
		return this.outfitsGroupRepos.findAll();
	}

	public List<OutfitGroupProjection> getOutfitsByUser() {
		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		return this.outfitsGroupRepos.getOutfitsByUser(user.getId());

	}

	public void addOutfit(Object[] outfitItems) {
		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		OutfitGroup outfitGroup = new OutfitGroup();
		outfitGroup.setUser(user);

		for (int i = 0; i < outfitItems.length; i++) {
			Object row = outfitItems[i];
			ObjectMapper oMapper = new ObjectMapper();

			@SuppressWarnings("unchecked")
			Map<String, Object> map = oMapper.convertValue(row, Map.class);
			try {
				String name = map.get("outfitName").toString();
				outfitGroup.setName(name);
				outfitsGroupRepos.saveAndFlush(outfitGroup);
			} catch (Exception e) {
			}
		}

		for (int i = 0; i < outfitItems.length; i++) {

			Object row = outfitItems[i];
			ObjectMapper oMapper = new ObjectMapper();

			@SuppressWarnings("unchecked")
			Map<String, Object> map = oMapper.convertValue(row, Map.class);
			try {
				String m = map.get("TypeOfItem").toString();

				if (m.equals("wardrobe")) {
					Integer id = Integer.valueOf(map.get("id").toString());
					Optional<Wardrobe> w = this.wardrobeRepo.findById(id);

					Outfits outfitw = new Outfits();
					outfitw.setWardrobe(w.get());
					outfitw.setUser(user);
					outfitw.setOutfitGroup(outfitGroup);
					this.outfitRepository.save(outfitw);

					// outfitGroup.setOutfits(outfitw);
					// outfitsGroupRepos.save(outfitGroup);
				}

				if (m.equals("collection")) {
					Integer id = Integer.valueOf(map.get("id").toString());
					Optional<Cloth> c = this.ClothRepo.getCollectionById(id);
					Outfits outfitc = new Outfits();
					outfitc.setCloth(c.get());
					outfitc.setUser(user);

					outfitc.setOutfitGroup(outfitGroup);
					this.outfitRepository.save(outfitc);

					// outfitGroup.setOutfits(outfitc);
					// outfitsGroupRepos.save(outfitGroup);
				}
				if (m.equals("native")) {
					Wardrobe img = new Wardrobe(map.get("type").toString(), map.get("imgUri").toString());
					this.wardrobeRepo.save(img);

					Outfits outfitn = new Outfits();
					outfitn.setWardrobe(img);
					outfitn.setUser(user);

					outfitn.setOutfitGroup(outfitGroup);
					this.outfitRepository.save(outfitn);
					// outfitGroup.setOutfits(outfitn);
					// outfitsGroupRepos.save(outfitGroup);

				}
			} catch (Exception e) {
			}
		}

	}

	public Set<OutfitGroup> findOutfitsByUserId() {
		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		Set<OutfitGroup> GroupsById = this.outfitsGroupRepos.findOutfitsByUserId(user.getId());

		return GroupsById;

	}

	public List<OutfitProjection> getOutfitItemsById(Long id) {
		return this.outfitRepository.getOutfitItemsById(id);
	}

	public Set<Wardrobe> getNotJoinedWardrobesByUser() {
		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		Set<Wardrobe> GroupsById = this.outfitRepository.getNotJoinedWardrobesByUser(user.getId());
		return GroupsById;
	}

	public Boolean getWardrobesUsedInOutfitsByUser(Long wardrobeId) {
		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		boolean exist = this.outfitRepository.getWardrobesUsedInOutfitsByUser(user.getId(), wardrobeId);
		return exist;
	}

	public void deleteOutfit(Long id) {
		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		this.outfitsGroupRepos.deleteOutfit(user.getId(), id);
	}

	public void modifyOutfitName(String name, Long id) {
		this.outfitsGroupRepos.modifyOutfitName(name, id);
	}

	public void modifyOutfitItems(Object[] outfitItems, Long outfitId) {

		UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(u.getUsername()).get();
		outfitRepository.deleteOutfitItems(outfitId);
		OutfitGroup outfitGroup = outfitsGroupRepos.getById(outfitId);

		for (int i = 0; i < outfitItems.length; i++) {
			Object row = outfitItems[i];
			ObjectMapper oMapper = new ObjectMapper();

			@SuppressWarnings("unchecked")
			Map<String, Object> map = oMapper.convertValue(row, Map.class);
			try {
				String name = map.get("outfitName").toString();
				outfitGroup.setName(name);
				outfitsGroupRepos.saveAndFlush(outfitGroup);
			} catch (Exception e) {
			}
		}

		for (int i = 0; i < outfitItems.length; i++) {

			Object row = outfitItems[i];
			ObjectMapper oMapper = new ObjectMapper();

			@SuppressWarnings("unchecked")
			Map<String, Object> map = oMapper.convertValue(row, Map.class);
			try {
				String m = map.get("TypeOfItem").toString();

				if (m.equals("wardrobe")) {
					Integer id = Integer.valueOf(map.get("id").toString());
					Optional<Wardrobe> w = this.wardrobeRepo.findById(id);

					Outfits outfitw = new Outfits();
					outfitw.setWardrobe(w.get());
					outfitw.setUser(user);
					outfitw.setOutfitGroup(outfitGroup);
					this.outfitRepository.save(outfitw);

					// outfitGroup.setOutfits(outfitw);
					// outfitsGroupRepos.save(outfitGroup);
				}

				if (m.equals("collection")) {
					Integer id = Integer.valueOf(map.get("id").toString());
					Optional<Cloth> c = this.ClothRepo.getCollectionById(id);
					Outfits outfitc = new Outfits();
					outfitc.setCloth(c.get());
					outfitc.setUser(user);

					outfitc.setOutfitGroup(outfitGroup);
					this.outfitRepository.save(outfitc);

					// outfitGroup.setOutfits(outfitc);
					// outfitsGroupRepos.save(outfitGroup);
				}
				if (m.equals("native")) {
					Wardrobe img = new Wardrobe(map.get("type").toString(), map.get("imgUri").toString());
					this.wardrobeRepo.save(img);

					Outfits outfitn = new Outfits();
					outfitn.setWardrobe(img);
					outfitn.setUser(user);

					outfitn.setOutfitGroup(outfitGroup);
					this.outfitRepository.save(outfitn);
					// outfitGroup.setOutfits(outfitn);
					// outfitsGroupRepos.save(outfitGroup);

				}
			} catch (Exception e) {
			}
		}

	}

}