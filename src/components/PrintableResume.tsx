import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  HERO_IMAGE,
  PROFESSIONAL_SKILLS,
  PROFILE,
  PROJECTS,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

export function PrintableResume() {
  return (
    <section
      aria-label="Printable Resume"
      className="hidden print:block bg-white text-black p-6 max-w-[800px] mx-auto text-sm leading-snug"
    >
      {/* Header with Photo */}
      <div className="flex items-start justify-between gap-6 pb-4 border-b-2 border-[#7657F6]">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold tracking-tight text-black">
            {PROFILE.name}
          </h1>
          <p className="text-xs font-semibold text-[#7657F6]">
            {PROFILE.designation}
          </p>
          <p className="text-xs text-slate-700">
            {PROFILE.location} · Phone: {PROFILE.phone}
          </p>
          <p className="text-xs text-slate-700">
            Email: {PROFILE.email} / {PROFILE.secondaryEmail}
          </p>
          <p className="text-xs text-slate-700">
            {PROFILE.socials.map((s) => `${s.label}: ${s.handle}`).join(' · ')}
          </p>
        </div>

        <img
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          className="w-24 h-24 object-cover object-top border border-slate-300 bg-white shrink-0"
        />
      </div>

      {/* Summary */}
      <div className="mt-4 space-y-1.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
          Professional Summary
        </h2>
        {PROFILE.summaryParagraphs.map((para) => (
          <p key={para} className="text-xs text-slate-800">
            {para}
          </p>
        ))}
      </div>

      {/* Technical Skills */}
      <div className="mt-4 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
          Technical Skills &amp; Core Competencies
        </h2>
        {SKILL_CATEGORIES.map((group) => (
          <p key={group.id} className="text-xs text-slate-800">
            <span className="font-semibold text-black">{group.category}: </span>
            {group.items.map((i) => i.name).join(', ')}
          </p>
        ))}
      </div>

      {/* Professional Experience */}
      <div className="mt-4 space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
          Professional Experience
        </h2>
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="space-y-1">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-bold text-black">
                {exp.role} — {exp.company}
              </p>
              <span className="text-[11px] font-mono text-slate-600 shrink-0">
                {exp.period} ·{' '}
                {exp.isConcurrent ? 'Concurrent Role' : exp.location}
              </span>
            </div>
            {exp.progressionSteps && (
              <p className="text-[11px] font-semibold text-[#7657F6]">
                Career Progression: {exp.progressionSteps.join(' → ')}
              </p>
            )}
            <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-800">
              {exp.highlights.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Key Projects */}
      <div className="mt-4 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
          Selected Projects
        </h2>
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="space-y-0.5">
            <p className="text-xs font-bold text-black">{proj.title}</p>
            <p className="text-xs text-slate-800">{proj.summary}</p>
            <p className="text-[11px] text-slate-600">
              Stack: {proj.stack.join(' · ')}
            </p>
          </div>
        ))}
      </div>

      {/* Education & Certifications */}
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
            Education
          </h2>
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <p className="text-xs font-bold text-black">
                {edu.degree} in {edu.field}
              </p>
              <p className="text-xs text-slate-700">
                {edu.institution}, {edu.location} · CGPA: {edu.cgpa}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
            Training &amp; Certifications
          </h2>
          <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-800">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.id}>
                {cert.title} — {cert.issuer} ({cert.credentialMeta})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Professional Skills */}
      <div className="mt-4 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#7657F6] border-b border-slate-200 pb-1">
          Professional &amp; Leadership Skills
        </h2>
        <p className="text-xs text-slate-800">
          {PROFESSIONAL_SKILLS.map((s) => s.title).join(' · ')}
        </p>
      </div>
    </section>
  );
}
