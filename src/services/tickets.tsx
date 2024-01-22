import { getRequest, postRequest } from "../utils/requests";

class TicketsService {
  /**
   * 
   * @param ticketID ID of the ticket to get
   * @returns Promise with the ticket data
   */
  static getTicketByID (ticketID: number) {
    const route = `/tickets/${ticketID}`;
    return getRequest(route);
  }

  /**
   * 
   * @param severity List of severity values to filter by
   * @param status List of status values to filter by
   * @param ticketType List of ticketType values to filter by
   * @param page Page number
   * @param size Number of tickets per page
   * @returns Promise with the list of tickets
   */
  static getTickets (queryString: string='', severity: string[]=[], status:string[]=[], ticketType: string[]=[], page: number=1, size:number=10) {
    const route = `/tickets?queryString=${queryString}&severity=${severity.join(',')}&status=${status.join(',')}&ticketType=${ticketType.join(',')}&page=${page}&size=${size}`;
    return getRequest(route);
  }

  /**
   * 
   * @param topic Topic of the ticket
   * @param description Short description of the ticket
   * @param severity Severity of the ticket
   * @param ticketType Type of the ticket
   * @returns Promise with the ticket data / error
   */
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
