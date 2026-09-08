import { useEffect, useMemo, useState } from "react";
import "./SecretaryDashboard.css";
import {
  getInterviews,
  updateInterviewStatus,
  type InterviewRecord,
  type InterviewStatus,
} from "../utils/localStorageData";

function formatDate(date: string): string {
  if (!date) return "-";
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function RequestCard({ interview }: { interview: InterviewRecord }) {
  const statuses: InterviewStatus[] = ["Pendiente", "Realizado", "Cancelado"];

  return (
    <article className="request-card">
      <div className="request-card__topline">
        <span className="request-card__id">{interview.id}</span>
        <span className={`request-card__status request-card__status--${interview.status.toLowerCase()}`}>
          {interview.status}
        </span>
      </div>

      <h3>{interview.studentName}</h3>
      <p>{interview.course} · Turno {interview.shift}</p>

      <dl className="request-card__details">
        <div><dt>Profesor</dt><dd>{interview.teacherName}</dd></div>
        <div><dt>Materia</dt><dd>{interview.subject}</dd></div>
        <div><dt>Fecha</dt><dd>{formatDate(interview.date)}</dd></div>
        <div><dt>Hora</dt><dd>{interview.time}</dd></div>
        <div><dt>Motivo</dt><dd>{interview.reason}</dd></div>
      </dl>

      <div className="request-card__actions" aria-label="Cambiar estado de entrevista">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            className={`status-button ${interview.status === status ? "status-button--active" : ""}`}
            onClick={() => updateInterviewStatus(interview.id, status)}
          >
            {status}
          </button>
        ))}
      </div>
    </article>
  );
}

function SecretaryDashboard() {
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]);

  const loadInterviews = () => {
    setInterviews(getInterviews());
  };

  useEffect(() => {
    loadInterviews();

    const handleUpdate = () => loadInterviews();
    window.addEventListener("interviewsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("interviewsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const pending = useMemo(
    () => interviews.filter((interview) => interview.status === "Pendiente"),
    [interviews],
  );

  const reviewed = useMemo(
    () => interviews.filter((interview) => interview.status !== "Pendiente"),
    [interviews],
  );

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = interviews.filter((interview) => interview.date === today).length;
  const completedCount = interviews.filter((interview) => interview.status === "Realizado").length;

  return (
    <main className="secretary-dashboard">
      <section className="secretary-dashboard__heading" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">Secretaría de Informaciones</p>
          <h1 id="dashboard-title">Solicitudes de entrevistas</h1>
          <p>Las entrevistas registradas por los profesores aparecen aquí automáticamente.</p>
        </div>
        <div className="secretary-live-badge">● Datos locales</div>
      </section>

      <section className="dashboard-summary" aria-label="Resumen de solicitudes">
        <div><strong>{String(pending.length).padStart(2, "0")}</strong><span>por revisar</span></div>
        <div><strong>{String(todayCount).padStart(2, "0")}</strong><span>registradas hoy</span></div>
        <div><strong>{String(completedCount).padStart(2, "0")}</strong><span>realizadas</span></div>
      </section>

      <div className="requests-layout">
        <aside className="reviewed-panel" aria-labelledby="reviewed-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Historial</p>
              <h2 id="reviewed-title">Revisadas</h2>
            </div>
            <span className="count-badge">{reviewed.length}</span>
          </div>

          <div className="reviewed-list">
            {reviewed.length === 0 ? (
              <p className="empty-requests">Todavía no hay entrevistas revisadas.</p>
            ) : (
              reviewed.map((interview) => <RequestCard key={interview.id} interview={interview} />)
            )}
          </div>
        </aside>

        <section className="active-panel" aria-labelledby="active-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Bandeja de entrada</p>
              <h2 id="active-title">Solicitudes pendientes</h2>
            </div>
            <span className="count-badge">{pending.length}</span>
          </div>

          <div className="active-list">
            {pending.length === 0 ? (
              <p className="empty-requests">No hay solicitudes pendientes.</p>
            ) : (
              pending.map((interview) => <RequestCard key={interview.id} interview={interview} />)
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default SecretaryDashboard;
