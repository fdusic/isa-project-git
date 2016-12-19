package beans;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Restaurant {

	public static enum TYPE { CHINESE, ITALIAN, VEGAN, AMERICAN, SPANISH, FRANCHE, SERBIAN }
	
	@Id
	private String name;
	private TYPE type;
	private User manager;
	private ArrayList<User> epmloyees = new ArrayList<User>();
	private float mark;
	private Menu menu;
	
	public Restaurant() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TYPE getType() {
		return type;
	}

	public void setType(TYPE type) {
		this.type = type;
	}

	public User getManager() {
		return manager;
	}

	public void setManager(User manager) {
		this.manager = manager;
	}

	public ArrayList<User> getEpmloyees() {
		return epmloyees;
	}

	public void setEpmloyees(ArrayList<User> epmloyees) {
		this.epmloyees = epmloyees;
	}

	public float getMark() {
		return mark;
	}

	public void setMark(float mark) {
		this.mark = mark;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}
	
}
