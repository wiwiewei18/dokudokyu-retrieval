import { DomainEvent } from './base.event';

export abstract class AggregateRoot<T> {
  private domainEvents: DomainEvent[] = [];

  get id(): T {
    throw new Error('Aggregate must implement id getter');
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }
}
