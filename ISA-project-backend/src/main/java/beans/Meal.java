package beans;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Meal {

	@Id
	private String name;
	private String desciprtion;
	
	public Meal() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesciprtion() {
		return desciprtion;
	}

	public void setDesciprtion(String desciprtion) {
		this.desciprtion = desciprtion;
	}
}
