import { getRequest, postRequest } from "../utils/requests";

export class AgentsService {
  static getAgentByID (agentID: string) {
    const route = `/agents/${agentID}`;
    return getRequest(route);
  }

  static createAgent (name:string, email:string, phone:string, description:string) {
    const requestData = {
      name: name,
      email: email,
      phone: phone,
      description: description
    }
    const route = `/agents`;
    return postRequest(route, requestData);
  }
}
