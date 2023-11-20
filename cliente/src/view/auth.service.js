import axios from "axios";

class AuthService {
    //função que dita o login e chama o controlador do login para ler a pass encriptada e ver se é compatível com o e-mail inserido, e insere o id do utilizador no local storage
    login(email, pass) {
        return axios
            .post("http://localhost:3000/utilizadores/login", { email, pass })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem("utilizador", JSON.stringify(res.data));
                }
                return res.data;
            }, reason => { throw new Error('Utilizador Inválido'); });
    }
    //dá logout ao remover o que está no local storage
    logout() { localStorage.removeItem("utilizador"); }
    //vai ao localstorage buscar o iduser que foi atribuido com o login e guarda o id
    getCurrentUserId() {
        const user = JSON.parse(localStorage.getItem('utilizador'));
        return user ? user.iduser : null;
    }
    //é usado no registar, pega no iduser do utilizador que acabou de ser criado e introduz o id no localstorage
    setCurrentUserId(userId) {
        const user = {
            iduser: userId
        };
        localStorage.setItem('utilizador', JSON.stringify(user));
    }
} export default new AuthService();