import axios from "axios";

export const Endpoint = "http://localhost:5000"

export default class API {
  GetTasks() {
    return axios.get(`${Endpoint}/tasks`);
  }

  GetTask(id) {
    return axios.get(`${Endpoint}/task/${id}`)
  }

  CreateTask(userId, content) {
    const payload = {
      'content': content
    };

    return axios.post(`${Endpoint}/user/${userId}/tasks`, payload);
  }

  MarkCompleted(taskId, completed) {
    const payload = {
      status: completed
    };
    return axios.put(`${Endpoint}/task/${taskId}/status`, payload);
  }

  DeleteTask(taskId) {
    return axios.delete(`${Endpoint}/task/${taskId}`);
  }

  GetUsers() {
    return axios.get(`${Endpoint}/users`);
  }
}