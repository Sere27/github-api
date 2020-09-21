class Storage {
    static getSearchedUsersFromStorage() {
        //tüm kullanıcıları al
        let users;
        if (localStorage.getItem("searched") === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUsersToStorage(username) {
        //kullanıcı ekleme
        let users = this.getSearchedUsersFromStorage();
        //Index of kullanacağız
        if (users.indexOf(username) === -1) {
            users.push(username);
        }
        //local storage a tekrar yazdık
        localStorage.setItem("searched", JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage() {
        //tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }
}