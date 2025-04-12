import { Router } from 'express';
import { TicketController } from './controller';

export class TicketsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TicketController();

    router.get('/', controller.getTickets);
    router.get('/last', controller.getLastTicketNumber);
    router.get('/pending', controller.pendingTickets);

    router.post('/', controller.createTicket);

    router.get('/draw/:desk', controller.drawTicket);
    router.put('/done/:ticketId', controller.doneTicket);

    router.get('/working-on', controller.workingOn);

    return router;
  }
}
