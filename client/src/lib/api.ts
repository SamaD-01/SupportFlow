const API_URL = 'http://127.0.0.1:8000/api'

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING'
  | 'RESOLVED'

export type TicketPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

export type TicketSummary = {
  id: number
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  createdAt: string
  updatedAt: string
}

export type TicketActivity = {
  id: number
  type: string
  message: string
  createdAt: string
}

export type Ticket = TicketSummary & {
  activities: TicketActivity[]
}

type TicketsResponse = {
  data: Ticket[]
}

export async function getTickets(): Promise<TicketSummary[]> {
  const response = await fetch(`${API_URL}/tickets`)

  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }

  const result: TicketsResponse = await response.json()

  return result.data
}

export async function getTicket(id: number): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch ticket')
  }

  const result: { data: Ticket } = await response.json()

  return result.data
}

export async function updateTicketStatus(
  id: number,
  status: TicketStatus,
): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update ticket')
  }

  const result: { data: Ticket } = await response.json()

  return result.data
}

export type CreateTicketInput = {
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
}

export async function createTicket(
  ticket: CreateTicketInput,
): Promise<TicketSummary> {
  const response = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error ?? 'Failed to create ticket')
  }

  return result.data
}