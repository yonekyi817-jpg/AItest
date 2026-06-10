const projects = [
  {
    title: 'Modern UI Design',
    description: 'A polished landing page for a SaaS product with responsive layout and stunning visuals.',
    tags: ['React', 'Tailwind', 'Responsive']
  },
  {
    title: 'E-commerce App',
    description: 'A fast, accessible product catalog with filtering, search, and checkout UI.',
    tags: ['React', 'UX', 'Performance']
  },
  {
    title: 'Developer Blog',
    description: 'A minimalist blog experience focused on readability, dark mode, and animation.',
    tags: ['Frontend', 'Design', 'Accessibility']
  }
]

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10 sm:px-10 lg:px-20">
      <header className="max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.4em] text-sm text-cyan-300">Frontend Developer</p>
        <h1 className="mt-6 text-4xl sm:text-5xl font-semibold">Hi, I’m Alex. I build modern web experiences.</h1>
        <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-8">
          I create responsive, accessible, and polished interfaces using React and Tailwind CSS. My work focuses on performance,
          intuitive design, and developer-friendly code.
        </p>
      </header>

      <section className="mt-16 max-w-4xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold">About Me</h2>
            <p className="mt-4 text-slate-300 leading-7">
              I’m a frontend developer with a passion for building product-focused websites and web apps.
              I enjoy turning complex problems into delightful user experiences and ship clean, scalable code.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Location</p>
                <p className="mt-1 font-medium">Remote / Anywhere</p>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Experience</p>
                <p className="mt-1 font-medium">4+ years</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {['React', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'Responsive Design'].map((skill) => (
                <span key={skill} className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <div className="mt-6 space-y-4">
              {projects.map((project) => (
                <article key={project.title} className="rounded-3xl bg-slate-950/80 p-5 border border-slate-800">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-slate-300 leading-7">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="mt-4 text-slate-300 leading-7">Interested in working together? Reach out for a project, collaboration, or freelance opportunity.</p>
            <a
              href="mailto:hello@example.com"
              className="mt-6 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Say Hello
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
