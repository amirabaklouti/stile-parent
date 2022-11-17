package com.iovision.stile.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.iovision.stile.entities.Features;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.WardrobeGroup;
import com.iovision.stile.repositories.FeaturesRepository;
import com.iovision.stile.repositories.UserRepository;
import com.iovision.stile.repositories.WardrobeGroupeRepository;
import com.iovision.stile.repositories.WardrobeRepository;
import com.iovision.stile.services.security.services.UserDetailsImpl;

@Service
public class WardrobeGroupService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	WardrobeGroupeRepository wardrobeGroupeRepo;

	@Autowired
	WardrobeRepository wardrobeRepo;

	@Autowired
	WardrobeGroupeRepository WardrobeGroupeRepo;

	@Autowired
	FeaturesRepository featuresRepo;

	boolean existGroup = false;

	public void addWardrobeGroup(String name) {
		existGroup = false;

		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();
		/*
		 * try { Set<WardrobeGroup> wardrobeGroups =
		 * wardrobeGroupeRepo.findWardrobeGroupByUser(user.getId());
		 * wardrobeGroups.forEach(elemet ->{ if(elemet.getName()== name)
		 * {existGroup=true;} else {existGroup=false;} }); }catch (Exception e) { }
		 * if(existGroup = false){
		 */
		WardrobeGroup group = new WardrobeGroup();
		group.setGroupName(name);
		group.setUser(user);
		wardrobeGroupeRepo.save(group);
		// }
	}

	public static void removeWardrobeGroup(String name) {
		// TODO Auto-generated method stub

	}

	public Set<WardrobeGroup> getkWardrobeGroup() {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();
		Long user_id = user.getId();
		return wardrobeGroupeRepo.getkWardrobeGroup(user_id);
	}

	public void deleteWardrobeGroupById(Long groupId) {
		wardrobeGroupeRepo.deleteWardrobeGroupById(groupId);
	}

	public void modifyGroupName(String oldName, String newName) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();
		Long usr = user.getId();
		wardrobeGroupeRepo.modifyGroupName(usr, oldName, newName);

	}

	public List<Wardrobe> getClothesByGroup(Long id) {
		return wardrobeRepo.getClothesByGroup(id);
	}

	public void deleteClothesFromGroup(Integer id) {
		wardrobeRepo.deleteClothesFromGroup(id);
	}

	public void deleteClothFromGroupUsedOutfits(Integer id) {
		wardrobeRepo.deleteClothFromGroupUsedOutfits(id);
	}

	/*
	 * public void addImageWardrobeGroup(Long parent, String imgUri, String imgName)
	 * { WardrobeDTO w = new WardrobeDTO(); w.setImgUri(imgUri); w.setName(imgName);
	 * w.setParentId(parent); wardrobeRepo.save(w); }
	 */

	public void saveWardrobeByGallery(MultipartFile file, Long groupeid) throws IOException {
		WardrobeGroup wg = this.WardrobeGroupeRepo.getById(groupeid);
		Wardrobe img = new Wardrobe(wg, file.getOriginalFilename(), "aaa", file.getContentType(),
				compressBytes(file.getBytes(), file.getContentType()));
		this.wardrobeRepo.save(img);

	}

	public void saveWardrobeByCamera(String base64, String type, Long groupeid) throws IOException {
		WardrobeGroup wg = this.WardrobeGroupeRepo.getById(groupeid);
		Wardrobe img = new Wardrobe(wg, type, base64);
		this.wardrobeRepo.save(img);

	}

	public void uploadWardrobe(String base64, String type, Long groupeid, String name, String category, String size,
			String color, String tissue, String brand, String features) {

		WardrobeGroup wg = this.WardrobeGroupeRepo.getById(groupeid);
		Wardrobe img = new Wardrobe(wg, name, color, brand, category, size, tissue, type, base64);
		this.wardrobeRepo.saveAndFlush(img);
		Optional<Wardrobe> savedWardrobe = this.wardrobeRepo.findById(img.getId());
		String List = removeFirstandLast(features);
		String[] elements = List.split(",");
		ArrayList<String> listFeatures = new ArrayList<String>(Arrays.asList(elements));
		for (int i = 0; i < listFeatures.size(); i++) {
			String elementFeature = listFeatures.get(i).replaceAll("^\"|\"$", "");
			Features f = new Features();
			f.setName(elementFeature);
			f.setWardrobe(savedWardrobe.get());
			this.featuresRepo.save(f);
		}

	}

	public String removeFirstandLast(String str) {
		StringBuffer sb = new StringBuffer(str);
		sb.delete(str.length() - 1, str.length());
		sb.delete(0, 1);
		return sb.toString();
	}

	public static String compressBytes(byte[] data, String type) {
		String encodedString = "data:" + type + ";base64," + Base64.getEncoder().encodeToString(data);
		return encodedString;
	}

	public void editWardrobe(Integer wardrobeId, Long groupeid, String name, String category, String size, String color,
			String tissue, String brand, String features) {

		WardrobeGroup wg = this.WardrobeGroupeRepo.getById(groupeid);
		this.wardrobeRepo.updateWardrobe(wardrobeId, wg, name, color, brand, category, size, tissue);
		Optional<Wardrobe> savedWardrobe = this.wardrobeRepo.findById(wardrobeId);
		String List = removeFirstandLast(features);
		String[] elements = List.split(",");
		ArrayList<String> listFeatures = new ArrayList<String>(Arrays.asList(elements));
		for (int i = 0; i < listFeatures.size(); i++) {
			String elementFeature = listFeatures.get(i).replaceAll("^\"|\"$", "");
			Features f = new Features();
			f.setName(elementFeature);
			f.setWardrobe(savedWardrobe.get());
			this.featuresRepo.save(f);
		}

	}

}
