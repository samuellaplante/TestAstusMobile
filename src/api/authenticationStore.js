import { observable, action } from 'mobx'
import api from "./api"

class AuthenticationStore {
    @observable isBusy = false;
    @observable errors = undefined;

    @observable values = {
        username: '',
        password: ''
    };

    @observable currentContext = undefined;

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action login() {
        this.isBusy = true;
        this.errors = undefined;
        return api.Authentication.login(this.values.username, this.values.password)
            .then(({ context }) => this.currentContext = context )
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.isBusy = false; }));
    }

    @action logout() {
        commonStore.setToken(undefined);
        return Promise.resolve();
    }
}

export default new AuthenticationStore();