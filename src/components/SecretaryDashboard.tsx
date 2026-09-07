import "./SecretaryDashboard.css";

type InterviewStatus = "Pendiente" | "Contactada" | "Confirmada" | "Realizada";

interface InterviewRequest {
  id: string;
  student: string;
  course: string;
  teacher: string;
  date: string;
  time: string;
  status: InterviewStatus;
}

const reviewedRequests: InterviewRequest[] = [
  { id: "S-016", student: "Valentina Suárez", course: "5.º de Secundaria", teacher: "Prof. Rojas", date: "05 Sep", time: "10:30", status: "Realizada" },
  { id: "S-014", student: "Mateo Vargas", course: "3.º de Secundaria", teacher: "Prof. Molina", date: "04 Sep", time: "09:00", status: "Realizada" },
  { id: "S-011", student: "Camila Flores", course: "2.º de Secundaria", teacher: "Prof. Pérez", date: "03 Sep", time: "11:15", status: "Realizada" },
];

const activeRequests: InterviewRequest[] = [
  { id: "S-021", student: "Sofía Arce", course: "4.º de Secundaria", teacher: "Prof. Rojas", date: "10 Sep", time: "08:30", status: "Pendiente" },
  { id: "S-022", student: "Diego López", course: "1.º de Secundaria", teacher: "Prof. Molina", date: "10 Sep", time: "10:00", status: "Contactada" },
  { id: "S-023", student: "Luciana Ramos", course: "6.º de Secundaria", teacher: "Prof. Pérez", date: "11 Sep", time: "09:45", status: "Confirmada" },
];

function RequestCard({ request }: { request: InterviewRequest }) {
  return (
    <article className="request-card">
      <div className="request-card__topline">
        <span className="request-card__id">{request.id}</span>
        <span className={`request-card__status request-card__status--${request.status.toLowerCase()}`}>
          {request.status}
        </span>
      </div>
      <h3>{request.student}</h3>
      <p>{request.course}</p>
      <dl className="request-card__details">
        <div><dt>Profesor</dt><dd>{request.teacher}</dd></div>
        <div><dt>Entrevista</dt><dd>{request.date} · {request.time}</dd></div>
      </dl>
    </article>
  );
}

function SecretaryDashboard() {
  return (
    <main className="secretary-dashboard">
      <section className="secretary-dashboard__heading" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">Secretaría de Informaciones</p>
          <h1 id="dashboard-title">Solicitudes de entrevistas</h1>
          <p>Organiza las entrevistas académicas de estudiantes y profesores.</p>
        </div>
        <button className="primary-button" type="button">+ Nueva solicitud</button>
      </section>

      <section className="dashboard-summary" aria-label="Resumen de solicitudes">
        <div><strong>03</strong><span>por revisar</span></div>
        <div><strong>02</strong><span>para hoy</span></div>
        <div><strong>16</strong><span>realizadas</span></div>
      </section>

      <div className="requests-layout">
        <aside className="reviewed-panel" aria-labelledby="reviewed-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Historial</p>
              <h2 id="reviewed-title">Revisadas</h2>
            </div>
            <span className="count-badge">{reviewedRequests.length}</span>
          </div>
          <div className="reviewed-list">
            {reviewedRequests.map((request) => <RequestCard key={request.id} request={request} />)}
          </div>
          <button className="text-button" type="button">Ver historial completo →</button>
        </aside>

        <section className="active-panel" aria-labelledby="active-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Bandeja de entrada</p>
              <h2 id="active-title">Solicitudes activas</h2>
            </div>
            <button className="filter-button" type="button">Filtrar</button>
          </div>
          <div className="active-list">
            {activeRequests.map((request) => <RequestCard key={request.id} request={request} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

export default SecretaryDashboard;
