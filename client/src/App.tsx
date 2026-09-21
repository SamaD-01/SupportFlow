import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowRight, CheckCircle2, Database, Ticket, Zap } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import TicketDetails from './pages/TicketDetails'
import NewTicket from './pages/NewTicket'

function LandingPage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.18),transparent_35%)]" />

      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:64px_64px]" />

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            SupportFlow
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#product" className="transition hover:text-white">
            Product
          </a>
          <a href="#architecture" className="transition hover:text-white">
            Architecture
          </a>
          <a href="#technology" className="transition hover:text-white">
            Technology
          </a>
        </div>

        <button className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:border-white/30 hover:bg-white/10">
          Open dashboard
        </button>
      </nav>

      <section
        className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl flex-col items-center px-6 pt-20 text-center lg:px-10 lg:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-7 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          Incident management platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-8xl"
        >
          Resolve incidents.
          <span className="block bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
            Keep teams moving.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg"
        >
          A modern platform for managing tickets, incidents and support
          workflows with clarity, speed and complete visibility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/dashboard"
            className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Try the demo
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
            View architecture
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }}
          className="mt-24 w-full max-w-5xl"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
            className="relative mx-auto aspect-[16/9] max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]">
              <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="ml-4 h-5 w-48 rounded-md bg-white/5" />
              </div>

              <div className="grid h-[calc(100%-44px)] grid-cols-[150px_1fr]">
                <div className="border-r border-white/10 p-4">
                  <div className="mb-6 flex items-center gap-2 text-xs font-semibold">
                    <div className="h-6 w-6 rounded-lg bg-white text-black" />
                    SupportFlow
                  </div>

                  <div className="space-y-2">
                    {['Dashboard', 'Tickets', 'Team', 'Settings'].map(
                      (item, index) => (
                        <div
                          key={item}
                          className={`rounded-lg px-3 py-2 text-left text-xs ${
                            index === 1
                              ? 'bg-white/10 text-white'
                              : 'text-white/35'
                          }`}
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-6 text-left">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/40">Dashboard</div>
                      <div className="mt-1 text-lg font-semibold">
                        Good morning, Samad
                      </div>
                    </div>

                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] text-emerald-300">
                      All systems operational
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ['24', 'Open tickets'],
                      ['12', 'In progress'],
                      ['86', 'Resolved'],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                      >
                        <div className="text-xl font-semibold">{value}</div>
                        <div className="mt-1 text-[10px] text-white/35">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    {[
                      ['#142', 'Password reset', 'HIGH'],
                      ['#141', 'Payment issue', 'HIGH'],
                      ['#140', 'Login problem', 'MEDIUM'],
                    ].map(([id, title, priority]) => (
                      <div
                        key={id}
                        className="flex items-center justify-between border-b border-white/5 px-4 py-3 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <Ticket size={14} className="text-white/30" />
                          <div>
                            <div className="text-xs font-medium">{title}</div>
                            <div className="text-[9px] text-white/30">{id}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[9px] text-white/30">
                            {priority}
                          </span>
                          <CheckCircle2
                            size={14}
                            className="text-emerald-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-8 top-16 hidden w-40 rounded-2xl border border-white/10 bg-[#101012]/90 p-4 text-left shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
                <Database size={12} />
                API
              </div>
              <div className="text-sm font-semibold">Operational</div>
              <div className="mt-2 h-1 rounded-full bg-emerald-400/30">
                <div className="h-full w-[92%] rounded-full bg-emerald-400" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-8 bottom-16 hidden w-40 rounded-2xl border border-white/10 bg-[#101012]/90 p-4 text-left shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="mb-2 text-[10px] text-white/40">
                Latest activity
              </div>
              <div className="text-xs font-medium">Ticket #142 updated</div>
              <div className="mt-1 text-[9px] text-white/30">
                2 minutes ago
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="architecture"
        className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="text-sm font-medium text-white/30">
              BUILT FOR MODERN TEAMS
            </div>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              From incident to resolution.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40">
            Every ticket follows a clear workflow, every action is tracked and
            every team member has the context they need to move faster.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ['01', 'Capture', 'Create and classify incidents in seconds.'],
            ['02', 'Collaborate', 'Assign, discuss and track every action.'],
            ['03', 'Resolve', 'Close incidents with complete visibility.'],
          ].map(([number, title, description]) => (
            <motion.div
              key={number}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-colors hover:bg-white/[0.05]"
            >
              <div className="text-xs text-white/25">{number}</div>
              <div className="mt-12 text-xl font-semibold">{title}</div>
              <p className="mt-3 text-sm leading-6 text-white/40">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="technology"
        className="relative z-10 border-y border-white/10 bg-white/[0.015]"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-14 lg:px-10">
          {['Symfony', 'React', 'TypeScript', 'PostgreSQL', 'Docker'].map(
            (technology) => (
              <div
                key={technology}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/50"
              >
                {technology}
              </div>
            ),
          )}
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>SupportFlow</span>
        <span>Built with Symfony + React</span>
      </footer>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/tickets/new" element={<NewTicket />} />
        <Route path="/dashboard/tickets/:id" element={<TicketDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
