import { useState } from "react";
import "./ProfessorDashboard.css";

interface InterviewRecord {
  id: number;
  student: string;
  course: string;
  shift: "Mañana" | "Tarde";
  subject: string;
  time: string;
  reason: string;
}

const initialRecords: InterviewRecord[] = [
  {
    id: 1,
    student: "Ejemplo: Juan Pérez",
    course: "5.º de Secundaria",
    shift: "Mañana",
    subject: "Matemática",
    time: "10:30",
    reason: "Seguimiento académico",
  },
];

function ProfessorDashboard() {
  const [records, setRecords] = useState<InterviewRecord[]>(initialRecords);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [shift, setShift] = useState<"Mañana" | "Tarde">("Mañana");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!student.trim() || !course.trim() || !subject.trim() || !time || !reason.trim()) {
      return;
    }

    setRecords((current) => [
      ...current,
      {
        id: Date.now(),
        student: student.trim(),
        course: course.trim(),
        shift,
        subject: subject.trim(),
        time,
        reason: reason.trim(),
      },
    ]);

    setStudent("");
    setCourse("");
    setShift("Mañana");
    setSubject("");
    setTime("");
    setReason("");
  };

  return (
    <main className="professor-dashboard">
      <section className="professor-dashboard__header">
        <div>
          <p className="professor-eyebrow">Panel del profesor</p>
          <h1>Registro de entrevistas</h1>
          <p>Registra los datos de la entrevista de cada estudiante de forma rápida y ordenada.</p>
        </div>
        <div className="professor-header-badge" aria-hidden="true">PROF</div>
      </section>

      <section className="professor-layout">
        <form className="interview-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <div className="form-icon" aria-hidden="true">+</div>
            <div>
              <p className="professor-eyebrow">Nueva entrevista</p>
              <h2>Datos de la entrevista</h2>
            </div>
          </div>

          <div className="form-grid">
            <label>
              <span>Estudiante</span>
              <input
                type="text"
                value={student}
                onChange={(event) => setStudent(event.target.value)}
                placeholder="Nombre del estudiante"
                required
              />
            </label>

            <label>
              <span>Curso</span>
              <input
                type="text"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                placeholder="Ej. 5.º de Secundaria"
                required
              />
            </label>

            <label>
              <span>Turno</span>
              <select value={shift} onChange={(event) => setShift(event.target.value as "Mañana" | "Tarde")}>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </label>

            <label>
              <span>Materia</span>
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Materia de la entrevista"
                required
              />
            </label>

            <label>
              <span>Hora</span>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </label>

            <label className="form-field--full">
              <span>Motivo</span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Escribe el motivo de la entrevista"
                rows={4}
                required
              />
            </label>
          </div>

          <button className="professor-submit" type="submit">Agregar entrevista</button>
        </form>

        <section className="records-panel" aria-labelledby="records-title">
          <div className="records-heading">
            <div>
              <p className="professor-eyebrow">Mis registros</p>
              <h2 id="records-title">Entrevistas agregadas</h2>
            </div>
            <span className="records-count">{records.length}</span>
          </div>

          <div className="records-list">
            {records.map((record) => (
              <article className="interview-record" key={record.id}>
                <div className="record-topline">
                  <span className="record-student">{record.student}</span>
                  <span className="record-shift">{record.shift}</span>
                </div>
                <p className="record-course">{record.course} · {record.subject}</p>
                <div className="record-details">
                  <span><strong>Hora:</strong> {record.time}</span>
                  <span><strong>Motivo:</strong> {record.reason}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default ProfessorDashboard;
