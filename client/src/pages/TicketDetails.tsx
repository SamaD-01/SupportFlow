import { motion } from 'motion/react'
import { ArrowLeft, Clock3, Loader2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getTicket,
  updateTicketStatus,
  type Ticket,
  type TicketStatus,
} from '../lib/api'

const statuses: TicketStatus[] = [
  'OPEN',
  'IN_PROGRESS',
  'WAITING',
  'RESOLVED',
]

const statusLabels: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In progress',
  WAITING: 'Waiting',
  RESOLVED: 'Resolved',
}

const statusStyles: Record<TicketStatus, string> = {
  OPEN: 'border-white/10 bg-white/5 text-white',
  IN_PROGRESS: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
  WAITING: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  RESOLVED: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
}

const priorityStyles: Record<string, string> = {
  LOW: 'border-white/10 bg-white/5 text-white/50',
  MEDIUM: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
  HIGH: 'border-orange-400/20 bg-orange-400/10 text-orange-300',
  CRITICAL: 'border-red-400/20 bg-red-400/10 text-red-300',
}

export default function TicketDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }

    getTicket(Number(id))
      .then(setTicket)
      .catch(() => setError('Unable to load ticket'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleStatusChange(status: TicketStatus) {
    if (!ticket || ticket.status === status) {
      return
    }

    setUpdating(true)

    try {
      const updatedTicket = await updateTicketStatus(ticket.id, status)
      const refreshedTicket = await getTicket(updatedTicket.id)
      setTicket(refreshedTicket)
    } catch {
      setError('Unable to update ticket')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <Loader2 className="animate-spin text-white/40" />
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <p className="text-sm text-red-300">
            {error ?? 'Ticket not found'}
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-xs text-white/50 transition hover:text-white"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-white/35 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to tickets
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1fr_300px]"
        >
          <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/30">
                #{ticket.id}
              </span>

              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${priorityStyles[ticket.priority]}`}
              >
                {ticket.priority}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/40">
                {ticket.category}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
              {ticket.title}
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/45">
              {ticket.description}
            </p>

            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-white">
                  Activity
                </h2>

                <div className="flex items-center gap-2 text-[10px] text-white/25">
                  <Clock3 size={12} />
                  {new Date(ticket.updatedAt).toLocaleString('fr-FR')}
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {ticket.activities.length === 0 ? (
                  <p className="text-xs text-white/25">
                    No activity yet.
                  </p>
                ) : (
                  ticket.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/50" />

                      <div>
                        <p className="text-xs text-white/70">
                          {activity.message}
                        </p>

                        <p className="mt-1 text-[10px] text-white/25">
                          {new Date(activity.createdAt).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25">
              Status
            </p>

            <div className="mt-4 space-y-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  disabled={updating}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-xs transition ${
                    ticket.status === status
                      ? statusStyles[status]
                      : 'border-white/5 bg-white/[0.02] text-white/35 hover:border-white/10 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{statusLabels[status]}</span>

                    {ticket.status === status && (
                      <motion.div
                        layoutId="active-status"
                        className="h-1.5 w-1.5 rounded-full bg-current"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {updating && (
              <div className="mt-4 flex items-center gap-2 text-[10px] text-white/25">
                <Loader2 size={12} className="animate-spin" />
                Updating ticket...
              </div>
            )}
          </aside>
        </motion.div>
      </main>
    </div>
  )
}