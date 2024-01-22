import { getRequest, postRequest } from "../utils/requests";

class TicketsService {
  static getTicketByID (ticketID: string) {
    const route = `/tickets/${ticketID}`;
    return getRequest(route);
  }

  static getTickets (status:string[]=[], severity: string[]=[], page: number=1, size:number=10) {
    const route = `/tickets?status=${status.join(',')}&severity=${severity.join(',')}&page=${page}&size=${size}`;
    return getRequest(route);
  }

  static createTicket (topic: string, description: string, severity: string, ticketType:string) {
    const requestData = {
      topic: topic,
      description: description,
      severity: severity,
      ticketType: ticketType
    }
    const route = `/tickets`;
    return postRequest(route, requestData);
  }
}

export default TicketsService;
