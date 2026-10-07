function HospitalVisual() {
  return (
    <div className="app-window" aria-hidden="true">
      <div className="app-window-top">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>Hospital / Operations</span>
        <span>HM</span>
      </div>
      <div className="dashboard-ui">
        <aside className="dashboard-rail">
          <b>H.</b>
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="dashboard-main">
          <small>OPERATIONS / OVERVIEW</small>
          <h4>Care, coordinated.</h4>
          <div className="dashboard-stats">
            <div>
              <span>Registrations</span>
              <b>24</b>
            </div>
            <div>
              <span>In queue</span>
              <b>08</b>
            </div>
            <div>
              <span>Stock alerts</span>
              <b>03</b>
            </div>
          </div>
          <div className="dashboard-chart">
            {[44, 63, 52, 77, 68, 87, 73, 96].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="dashboard-caption">
            <span>Patient flow</span>
            <span>MON — SUN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendXVisual() {
  return (
    <div className="phones" aria-hidden="true">
      <div className="phone">
        <small>9:41　● ● ●</small>
        <h4>Check in.</h4>
        <div className="metric">
          <span>Face recognition</span>
          <b>Ready</b>
          <span>Secure attendance</span>
        </div>
        <div className="phone-line">
          <i />
          <span>Face registered</span>
        </div>
        <div className="phone-line">
          <i />
          <span>Identity verified</span>
        </div>
      </div>
      <div className="phone dark">
        <small>9:41　● ● ●</small>
        <h4>Attendance.</h4>
        <div className="metric acid">
          <span>Status</span>
          <b>Present</b>
          <span>Record updated</span>
        </div>
        <div className="phone-line">
          <i />
          <span>Reports ready</span>
        </div>
        <div className="phone-line">
          <i />
          <span>Team directory</span>
        </div>
      </div>
    </div>
  );
}

function ErpVisual() {
  return (
    <div className="board" aria-hidden="true">
      <div className="board-copy">
        <small>ERP / OPERATIONS</small>
        <b>One working view.</b>
        <span>Business activity organised in one place.</span>
      </div>
      <aside className="flow-map">
        <span className="flow-node">INPUT</span>
        <span className="flow-connector" />
        <span className="flow-node central">ERP</span>
        <span className="flow-connector" />
        <span className="flow-node">OVERVIEW</span>
      </aside>
    </div>
  );
}

function ServifyVisual() {
  return (
    <div className="servify-preview" aria-hidden="true">
      <div className="servify-preview-top">
        <b>servify.</b>
        <span>Services, made simpler</span>
      </div>
      <div className="servify-preview-main">
        <small>FIND THE RIGHT HELP</small>
        <strong>What can we help with?</strong>
        <div className="servify-categories">
          <span>Home care</span>
          <span>Repairs</span>
          <span>Everyday services</span>
        </div>
      </div>
      <div className="servify-preview-bottom">
        Browse services <span>↗</span>
      </div>
    </div>
  );
}

const visuals = {
  hospital: HospitalVisual,
  attendx: AttendXVisual,
  erp: ErpVisual,
  servify: ServifyVisual,
};

export default function ProjectVisual({ type, screenshot }) {
  if (screenshot) {
    return (
      <figure className={`project-screenshot project-screenshot--${type}`}>
        <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
      </figure>
    );
  }

  const Visual = visuals[type];
  return Visual ? <Visual /> : null;
}
