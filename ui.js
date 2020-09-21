class UI {
	constructor() {
		//arayüz elementlerimiz
		this.profileDiv = document.getElementById("profile");
		this.repoDiv = document.getElementById("repos");
		this.lastUsers = document.getElementById("last-users");
		this.inputField = document.getElementById("github-name");
	}

	clearInput() {
		this.inputField.value = "";
	}
}
