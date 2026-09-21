import { ArrowLeft, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTicket, type TicketPriority, type TicketStatus } from '../lib/api'

const priorities: TicketPriority[] = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL',
]

const statuses: TicketStatus[] = [
  'OPEN',
  'IN_PROGRESS',
  'WAITING',
  'RESOLVED',
]

export default function NewTicket() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Authentication')
  const [priority, setPriority] = useState<TicketPriority>('MEDIUM')
  const [status, setStatus] = useState<TicketStatus>('OPEN')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const ticket = await createTicket({
        title,
        description,
        category,
        priority,
        status,
      })

      navigate(`/dashboard/tickets/${ticket.id}`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create ticket',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-white/35 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            Workspace
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Create a ticket
          </h1>

          <p className="mt-2 text-sm text-white/35">
            Create a support request and start tracking its activity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Title
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Describe the issue briefly"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the issue in more detail..."
                rows={6}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0c] px-4 py-3 text-xs text-white outline-none"
                >
                  <option>Authentication</option>
                  <option>Payments</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Performance</option>
                  <option>Notifications</option>
                  <option>Infrastructure</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value as TicketPriority)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0c] px-4 py-3 text-xs text-white outline-none"
                >
                  {priorities.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-xs font-medium text-white/60"
                >
                  Status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as TicketStatus)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0c] px-4 py-3 text-xs text-white outline-none"
                >
                  {statuses.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <div className="flex justify-end border-t border-white/10 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}

                {loading ? 'Creating...' : 'Create ticket'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}