import { UuidAdapter } from '../../config/uuid.adapter';
import { Ticket } from '../../domain/interfaces/ticket';
import { WssService } from './wss.service';

export class TicketService {
  constructor(private readonly wssService = WssService.instance) {}

  public tickets: Ticket[] = [
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
    return this.workingOnTickets.slice(0, 4);
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
    this.onTicketNumberChanged();

    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find(ticket => !ticket.handleAtDesk);
    if (!ticket) return { status: 'error', message: 'No pending ticket' };
    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    this.onTicketNumberChanged();
    this.onWorkingOnChanged();
    return { status: 'ok', ticket };
  }

  public onFinishTicket(id: string) {
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) return { status: 'error', message: 'Ticket not found' };
    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === id) ticket.done = true;
      return ticket;
    });

    return { status: 'ok' };
  }

  private onTicketNumberChanged() {
    this.wssService.sendMessage(
      'on-ticket-count-changed',
      this.pendingTickets.length
    );
  }

  private onWorkingOnChanged() {
    this.wssService.sendMessage(
      'on-working-ticket-changed',
      this.lastWorkingOnTickets
    );
  }
}
