import { observable, action } from 'mobx'
import api from "./api"

class VehicleLastStateStore {
    @observable isBusy = false;

    @observable store = undefined;

    @action getAll() {
        this.isBusy = true;
        return api.VehicleLastState.getAll()
            .then(action((res) => {
                 this.store = res 
             } ))
            .catch(action((err) => {
                console.log(err);
                throw err;
            }))
            .finally(action(() => { this.isBusy = false; }));
    }
}

export default new VehicleLastStateStore();