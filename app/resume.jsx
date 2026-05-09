/* global React, Reveal */
const { useState } = React;

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Edit TIMELINE with your actual career entries.
// start/end: [year, month 1–12]. end: null = current/ongoing.
// kind: 'career' | 'gap' | 'education'
// Overlapping entries (e.g. school + internship) are automatically placed in separate lanes.
const TIMELINE = window.CONTENT.timeline;

function fmtDate([y, m]) {
  return m === 1 ? String(y) : MONTHS[m - 1] + ' ' + y;
}

function toAbs([y, m]) {
  return y * 12 + (m - 1);
}

function GanttTimeline() {
  const PX_PER_MONTH = 14;
  const CARD_GAP = 8;

  const now = new Date();
  const nowArr = [now.getFullYear(), now.getMonth() + 1];
  const nowAbs = toAbs(nowArr);

  const entries = TIMELINE.map((e, idx) => {
    const startAbs = toAbs(e.start);
    const endAbs = e.end ? toAbs(e.end) : nowAbs;
    return { ...e, idx, startAbs, endAbs };
  });

  const oldestAbs = Math.min(...entries.map(e => e.startAbs));
  const totalMonths = nowAbs - oldestAbs + 6;
  const totalHeight = totalMonths * PX_PER_MONTH;

  // Top = now, going down = further in the past
  const getTopPx = (abs) => (nowAbs - abs) * PX_PER_MONTH;

  const positioned = entries.map(e => ({
    ...e,
    topPx: getTopPx(e.endAbs),
    heightPx: Math.max((e.endAbs - e.startAbs) * PX_PER_MONTH, 56),
  }));

  // Greedy lane assignment based on actual time overlap
  const sorted = [...positioned].sort((a, b) => a.topPx - b.topPx || a.idx - b.idx);
  const lanes = [];
  const laned = sorted.map(entry => {
    let lane = lanes.findIndex(laneEntries =>
      !laneEntries.some(ex => entry.startAbs < ex.endAbs && entry.endAbs > ex.startAbs)
    );
    if (lane === -1) {
      lane = lanes.length;
      lanes.push([]);
    }
    lanes[lane].push(entry);
    return { ...entry, lane };
  });
  const numLanes = Math.max(1, lanes.length);

  // Year gridlines: January of each year in range
  const startYear = Math.floor(oldestAbs / 12);
  const yearMarks = [];
  for (let y = nowArr[0]; y >= startYear; y--) {
    const abs = toAbs([y, 1]);
    if (abs > nowAbs) continue;
    const topPx = getTopPx(abs);
    if (topPx > totalHeight) break;
    yearMarks.push({ y, topPx });
  }

  const laneWVal = numLanes === 1
    ? '100%'
    : `calc((100% - ${(numLanes - 1) * CARD_GAP}px) / ${numLanes})`;

  return (
    <div className="timeline" style={{ '--tl-total-h': totalHeight + 'px' }}>
      <div className="timeline__legend">
        <div className="timeline__legend-item">
          <div className="timeline__legend-swatch" />
          Career
        </div>
        <div className="timeline__legend-item">
          <div className="timeline__legend-swatch timeline__legend-swatch--gap" />
          Bridge / gap
        </div>
        <div className="timeline__legend-item">
          <div className="timeline__legend-swatch timeline__legend-swatch--education" />
          Education
        </div>
        <div className="timeline__legend-item">
          <div className="timeline__legend-swatch timeline__legend-swatch--current" />
          Current
        </div>
      </div>

      <div className="timeline__axis">
        {yearMarks.map(({ y, topPx }) => (
          <div key={y} className="timeline__axis-year" style={{ top: topPx + 'px' }}>
            {y}
          </div>
        ))}
      </div>

      <div className="timeline__lanes" style={{ '--tl-lane-w': laneWVal }}>
        {yearMarks.map(({ y, topPx }) => (
          <div key={y} className="timeline__gridline" style={{ top: topPx + 'px' }} />
        ))}

        <div className="timeline__now" style={{ top: 0 }}>
          <div className="timeline__now-dot" />
          <div className="timeline__now-label">Now</div>
        </div>

        {laned.map(entry => {
          const isShort = entry.heightPx < 56;
          return (
            <div
              key={entry.idx}
              className="timeline__card"
              data-kind={entry.kind}
              data-current={entry.current ? 'true' : undefined}
              data-short={isShort ? 'true' : undefined}
              style={{
                top: entry.topPx + 'px',
                height: entry.heightPx + 'px',
                left: entry.lane === 0 ? '0' : `calc(${entry.lane} * (var(--tl-lane-w) + ${CARD_GAP}px))`,
                width: 'var(--tl-lane-w)',
              }}
            >
              <div className="timeline__card-role">{entry.role}</div>
              {!isShort && <div className="timeline__card-org">{entry.org}</div>}
              {!isShort && (
                <div className="timeline__card-dates">
                  {fmtDate(entry.start)} — {entry.end ? fmtDate(entry.end) : 'present'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Resume({ name, pdfUrl }) {
  const [pdfMissing, setPdfMissing] = useState(false);

  return (
    <section className="view view-anim-enter">
      <div className="resume">
        <Reveal>
          <div className="resume__topbar">
            <div>
              <div className="eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>03 — Curriculum vitae</div>
              <h1>Resume</h1>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="section-label" style={{ marginTop: 'var(--sp-5)' }}>Career journey</div>
        </Reveal>
        <Reveal delay={60}>
          <p style={{ maxWidth: 'var(--container-prose)', color: 'var(--fg-2)', fontSize: 'var(--text-base)', margin: '0 0 var(--sp-5)' }}>
            A wider view than the resume below — including bridge roles that may not appear on the official CV. 
          </p>
        </Reveal>
        <GanttTimeline />

        <Reveal>
          <div className="section-label">Official resume · {name}</div>
        </Reveal>
        <Reveal delay={60}>
          <div className="resume__pdf-wrap">
            <div className="resume__pdf-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                <div className="resume__pdf-bar-dots">
                  <span /><span /><span />
                </div>
                <span>resume.pdf</span>
              </div>
              <span>{pdfUrl && !pdfMissing ? 'PDF · embedded' : 'No PDF attached'}</span>
            </div>
            {pdfUrl && !pdfMissing ? (
              <object
                className="resume__pdf-frame"
                data={pdfUrl + '#view=FitH&toolbar=1'}
                type="application/pdf"
                aria-label="Resume PDF"
                onError={() => setPdfMissing(true)}
              >
                <iframe
                  src={pdfUrl}
                  className="resume__pdf-frame"
                  title="Resume PDF"
                  onError={() => setPdfMissing(true)}
                />
              </object>
            ) : (
              <div className="resume__pdf-empty">
                <div className="resume__pdf-empty-card">
                  <h3>Drop your resume PDF here</h3>
                  <p>
                    Save your file to <code>assets/resume.pdf</code> in this project,
                    or change the <code>resumePdf</code> field in the Tweaks panel
                    to point at any URL. The viewer will pick it up automatically.
                  </p>
                  <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--fg-3)' }}>
                    expecting: <code>{pdfUrl || 'assets/resume.pdf'}</code>
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Resume = Resume;
