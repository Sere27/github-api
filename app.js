//Elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();

const ui = new UI();

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);

    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
    //trim ile gereksiz boşlukları temizliyoruz
    let username = nameInput.value.trim();

    if (username === "") {
        alert("Geçerli bir kullanıcı adı giriniz!");
    } else {
        github
            .getGithubData(username)
            .then((response) => {
                // user bulunamazsa
                if (response.user.message === "Not Found") {
                    //hata mesajı
                    ui.showError("Kullanıcı bulunamadı!");
                } else {
                    //ui olanı storagedan sonra yazarsak ilk eklenip sonra test edecek
                    ui.addSearchedUsersToUI(username);
                    Storage.addSearchedUsersToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch((err) => ui.showError(err));
    }

    ui.clearInput();

    e.preventDefault();
}

function clearAllSearched() {
    //tüm arananları temizle
    if (confirm("Emin misiniz?")) {
        //Silme işlemleri
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched() {
    //arananları storage al ui ekle
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach((user) => {
        result += `<li class ="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML = result;
}