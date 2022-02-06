import http from "../http-common";
import CreditsAction from "../interfaces/CreditsAction";

class CreditsActionService {
  getAll() {
    return http.get("/credits");
  }
  update(data: CreditsAction[]) {
    return http.put("/credits", data);
  }
}

export default new CreditsActionService();
