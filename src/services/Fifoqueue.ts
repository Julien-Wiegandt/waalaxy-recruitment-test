import http from "../http-common";
import Action from "../interfaces/Action";

class FifoQueueService {
  getAll() {
    return http.get("/fifoqueue");
  }
  update(data: Action[]) {
    return http.put("/fifoqueue", data);
  }
}

export default new FifoQueueService();
