import { UuidAdapter } from '../../config/uuid.adapter';
import { Ticket } from '../../domain/interfaces/ticket';

export class TicketService {
  public readonly tickets: Ticket[] = [
    { id: UuidAdapter.v4(), number: 1, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createAt: new Date(), done: false },
  ];

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(ticket => !ticket.handleAtDesk);
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.splice(0, 4);
  }

  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket(): Ticket {
    const ticket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createAt: new Date(),
      done: false,
    };

    this.tickets.push(ticket);
    //TODO WS

    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find(ticket => !ticket.handleAtDesk);
    if (!ticket) return { status: 'error', message: 'No pending ticket' };
    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    //TODO WS
    return { status: 'ok', ticket };
  }

  public onFinishTicket(id: string) {
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) return { status: 'error', message: 'Ticket not found' };
    this.tickets.map(ticket => {
      if (ticket.id === id) ticket.done = true;
      return ticket;
    });

    return { status: 'ok' };
  }
}
