import { CONFIG } from '../config';

function ProjectCard({ p }) {
  return (
    <article className="card pcard" data-tilt data-reveal data-cursor="view">
      <div className="pc-head">
        <p className="tag"><span className="dot" />{p.tag}</p>
        <small className="pc-year">{p.year}</small>
      </div>
      <h3 className="pc-name">{p.name}</h3>
      <p className="pc-kind">{p.kind}</p>
      <p className="lead pc-sum">{p.summary}</p>
      <ul className="list pc-list">
        {p.highlights.map(h => <li key={h}>{h}</li>)}
      </ul>
      <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
      <div className="row pc-row">
        <a data-mag className="btn primary" href={p.live} target="_blank" rel="noreferrer">Live Demo</a>
        <a data-mag className="btn" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </article>
  );
}

export default function Project() {
  return (
    <section id="work" className="sec">
      <p className="tag" data-reveal><span className="dot" />Featured Work · 2026</p>
      <h2 className="big" data-reveal>Selected Projects.</h2>
      <p className="lead" data-reveal>Three products I designed, built and shipped end to end — each one live in production.</p>
      <div className="pgrid">
        {CONFIG.projects.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
