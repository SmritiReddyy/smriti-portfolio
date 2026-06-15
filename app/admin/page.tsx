'use client';

import { useState, useEffect } from 'react';

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
}

interface ProjectEntry {
  repoName: string;
  title: string;
  desc: string;
  category: 'systems-cloud' | 'ml-data-science';
  badge: string | null;
  badgeStyle: null;
  badges: string[] | null;
  lang: string;
  tags: string[];
}

interface Config {
  projects: ProjectEntry[];
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) {
      onLogin(pw);
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={s.loginWrap}>
      <div style={s.loginCard}>
        <h1 style={s.loginTitle}>Portfolio Admin</h1>
        <p style={s.loginSub}>Enter your admin password to continue</p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            style={s.input}
            autoFocus
          />
          {error && <p style={{ color: '#f87171', fontSize: '0.875rem', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} style={s.primaryBtn}>
            {loading ? 'Checking…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Project Row (expanded editor for a selected project) ──────────────────────

function ProjectRow({
  entry,
  onChange,
  onRemove,
}: {
  entry: ProjectEntry;
  onChange: (updated: ProjectEntry) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isML = entry.category === 'ml-data-science';

  const set = <K extends keyof ProjectEntry>(key: K, val: ProjectEntry[K]) =>
    onChange({ ...entry, [key]: val });

  return (
    <div style={s.repoCard}>
      <div style={s.repoCardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          <div style={{ ...s.dot, backgroundColor: '#34d399' }} />
          <span style={s.repoName}>{entry.repoName}</span>
          <span style={s.categoryChip}>{entry.category === 'systems-cloud' ? 'Systems & Cloud' : 'ML / Data Science'}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button onClick={() => setOpen(o => !o)} style={s.ghostBtn}>
            {open ? 'Close ▲' : 'Edit ▼'}
          </button>
          <button onClick={onRemove} style={s.removeBtn}>Remove</button>
        </div>
      </div>

      {open && (
        <div style={s.expandedForm}>
          <label style={s.label}>Display Title
            <input style={s.input} value={entry.title} onChange={e => set('title', e.target.value)} />
          </label>

          <label style={s.label}>Description
            <textarea style={{ ...s.input, height: '80px', resize: 'vertical' as const }} value={entry.desc} onChange={e => set('desc', e.target.value)} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <label style={s.label}>Category
              <select
                style={s.input}
                value={entry.category}
                onChange={e => set('category', e.target.value as ProjectEntry['category'])}
              >
                <option value="systems-cloud">Systems & Cloud</option>
                <option value="ml-data-science">ML / Data Science</option>
              </select>
            </label>

            <label style={s.label}>Language
              <input style={s.input} value={entry.lang} onChange={e => set('lang', e.target.value)} placeholder="e.g. Python · React" />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {isML ? (
              <label style={s.label}>Badges (comma-separated)
                <input
                  style={s.input}
                  value={(entry.badges ?? []).join(', ')}
                  onChange={e => set('badges', e.target.value.split(',').map(b => b.trim()).filter(Boolean))}
                  placeholder="e.g. ML, Data Science"
                />
              </label>
            ) : (
              <label style={s.label}>Badge
                <input style={s.input} value={entry.badge ?? ''} onChange={e => set('badge', e.target.value || null)} placeholder="e.g. Featured" />
              </label>
            )}

            <label style={s.label}>Tags (comma-separated)
              <input
                style={s.input}
                value={entry.tags.join(', ')}
                onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                placeholder="e.g. Docker, AWS, FastAPI"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Repo Picker (unselected repos) ───────────────────────────────────────────

function RepoPicker({
  repos,
  selectedNames,
  onAdd,
}: {
  repos: Repo[];
  selectedNames: Set<string>;
  onAdd: (repo: Repo) => void;
}) {
  const [search, setSearch] = useState('');
  const available = repos.filter(r => !selectedNames.has(r.name) && r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={s.sectionHeading}>Add a Project</h2>
      <input
        style={{ ...s.input, marginBottom: '16px' }}
        placeholder="Search your repos…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px', maxHeight: '360px', overflowY: 'auto' as const }}>
        {available.length === 0 && (
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>No repos found</p>
        )}
        {available.map(repo => (
          <div key={repo.name} style={s.repoPickerRow}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{repo.name}</p>
              {repo.description && (
                <p style={{ margin: '2px 0 0', color: '#9ca3af', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {repo.description}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {repo.language && <span style={s.langChip}>{repo.language}</span>}
              <button onClick={() => onAdd(repo)} style={s.addBtn}>+ Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('admin_pw') : null
  );
  const [repos, setRepos] = useState<Repo[]>([]);
  const [config, setConfig] = useState<Config>({ projects: [] });
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveMsg, setSaveMsg] = useState('');

  const handleLogin = (pw: string) => {
    sessionStorage.setItem('admin_pw', pw);
    setPassword(pw);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pw');
    setPassword(null);
  };

  useEffect(() => {
    if (!password) return;

    Promise.all([
      fetch('/api/admin/repos').then(r => r.json()),
      fetch('/api/admin/config').then(r => r.json()),
    ]).then(([repoList, cfg]) => {
      setRepos(repoList);
      setConfig(cfg);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [password]);

  const updateProject = (index: number, updated: ProjectEntry) => {
    setConfig(c => {
      const projects = [...c.projects];
      projects[index] = updated;
      return { ...c, projects };
    });
    setSaveState('idle');
  };

  const removeProject = (index: number) => {
    setConfig(c => ({ ...c, projects: c.projects.filter((_, i) => i !== index) }));
    setSaveState('idle');
  };

  const addRepo = (repo: Repo) => {
    const newEntry: ProjectEntry = {
      repoName: repo.name,
      title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      desc: repo.description ?? '',
      category: 'systems-cloud',
      badge: null,
      badgeStyle: null,
      badges: null,
      lang: repo.language ?? '',
      tags: [],
    };
    setConfig(c => ({ ...c, projects: [...c.projects, newEntry] }));
    setSaveState('idle');
  };

  const save = async () => {
    setSaveState('saving');
    const res = await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, config }),
    });
    const data = await res.json();
    if (res.ok) {
      setSaveState('saved');
      setSaveMsg(data.message ?? 'Saved!');
    } else {
      setSaveState('error');
      setSaveMsg(data.error ?? 'Something went wrong');
    }
  };

  if (!password) return <LoginScreen onLogin={handleLogin} />;

  const selectedNames = new Set(config.projects.map(p => p.repoName));

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.headerTitle}>Portfolio Admin</h1>
          <p style={s.headerSub}>Select and configure which GitHub projects appear on your portfolio</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {saveState === 'saved' && <span style={{ color: '#34d399', fontSize: '0.875rem' }}>✓ {saveMsg}</span>}
          {saveState === 'error' && <span style={{ color: '#f87171', fontSize: '0.875rem' }}>✗ {saveMsg}</span>}
          <button
            onClick={save}
            disabled={saveState === 'saving'}
            style={{ ...s.primaryBtn, opacity: saveState === 'saving' ? 0.6 : 1 }}
          >
            {saveState === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>
          <button onClick={handleLogout} style={s.ghostBtn}>Logout</button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: '80px' }}>Loading your repos…</p>
      ) : (
        <div style={s.content}>
          {/* Selected projects */}
          <h2 style={s.sectionHeading}>
            On Portfolio
            <span style={s.countBadge}>{config.projects.length}</span>
          </h2>

          {config.projects.length === 0 && (
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No projects selected yet. Add some from below.</p>
          )}

          {config.projects.map((entry, i) => (
            <ProjectRow
              key={entry.repoName}
              entry={entry}
              onChange={updated => updateProject(i, updated)}
              onRemove={() => removeProject(i)}
            />
          ))}

          {/* Repo picker */}
          <RepoPicker repos={repos} selectedNames={selectedNames} onAdd={addRepo} />

          {/* Sticky save bar */}
          <div style={s.saveBar}>
            {saveState === 'saved' && <span style={{ color: '#34d399', fontSize: '0.875rem' }}>✓ {saveMsg}</span>}
            {saveState === 'error' && <span style={{ color: '#f87171', fontSize: '0.875rem' }}>✗ {saveMsg}</span>}
            <button
              onClick={save}
              disabled={saveState === 'saving'}
              style={{ ...s.primaryBtn, opacity: saveState === 'saving' ? 0.6 : 1 }}
            >
              {saveState === 'saving' ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = {
  page: {
    backgroundColor: '#0a0a0a',
    color: '#fff',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, sans-serif",
    paddingBottom: '120px',
  },
  header: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    backgroundColor: 'rgba(10,10,10,0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '20px 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  headerTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    margin: 0,
    background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  headerSub: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: '4px 0 0',
  },
  content: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  sectionHeading: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#e5e7eb',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  countBadge: {
    padding: '2px 10px',
    borderRadius: '12px',
    backgroundColor: 'rgba(99,102,241,0.2)',
    border: '1px solid rgba(99,102,241,0.3)',
    color: '#a5b4fc',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  repoCard: {
    borderRadius: '14px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '12px',
    overflow: 'hidden',
  },
  repoCardHeader: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  repoName: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  categoryChip: {
    padding: '3px 10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.2)',
    color: '#a5b4fc',
    fontSize: '0.75rem',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
  },
  expandedForm: {
    padding: '0 20px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  label: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    fontSize: '0.8rem',
    color: '#9ca3af',
    fontWeight: 500,
  },
  input: {
    padding: '10px 14px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '0.9rem',
    width: '100%',
    boxSizing: 'border-box' as const,
    outline: 'none',
    fontFamily: 'inherit',
  },
  repoPickerRow: {
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  langChip: {
    padding: '3px 8px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#9ca3af',
    fontSize: '0.75rem',
  },
  primaryBtn: {
    padding: '10px 22px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  ghostBtn: {
    padding: '8px 16px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#9ca3af',
    fontWeight: 500,
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  removeBtn: {
    padding: '8px 14px',
    borderRadius: '10px',
    backgroundColor: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#f87171',
    fontWeight: 500,
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  addBtn: {
    padding: '6px 14px',
    borderRadius: '8px',
    backgroundColor: 'rgba(52,211,153,0.1)',
    border: '1px solid rgba(52,211,153,0.2)',
    color: '#34d399',
    fontWeight: 600,
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  saveBar: {
    position: 'fixed' as const,
    bottom: '32px',
    right: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    borderRadius: '14px',
    backgroundColor: 'rgba(10,10,10,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  loginWrap: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  loginTitle: {
    fontSize: '1.6rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 8px',
  },
  loginSub: {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: '0 0 28px',
  },
} as const;
