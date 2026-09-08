import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./ProfessorDashboard.css";
import { authRepository } from "../repositories/authRepository";
import {
  getInterviews,
  getStudents,
  getToday,
  saveInterview,
  saveStudent,
  type InterviewRecord,
  type StudentShift,
} from "../utils/localStorageData";

function getOrCreateStudent(studentName: string, course: string, shift: StudentShift): string {
  const normalizedName = studentName.trim().replace(/\s+/g, " ");
  const existingStudent = getStudents().find(
    (student) =>
      `${student.name} ${student.lastName} ${student.secondLastName}`.trim().toLowerCase() === normalizedName.toLowerCase() &&
      student.course === course.trim() &&
      student.shift === shift,
  );

  if (existingStudent) return existingStudent.id;

  const parts = normalizedName.split(" ");
  const newStudent = {
    id: `student-${Date.now()}`,
    name: parts[0] ?? normalizedName,
    lastName: parts[1] ?? "",
    secondLastName: parts.slice(2).join(" "),
    course: course.trim(),
    shift,
  };

  saveStudent(newStudent);
  return newStudent.id;
}

function ProfessorDashboard() {
  const currentUser = authRepository.getCurrentUser();
  const [records, setRecords] = useState<InterviewRecord[]>([]);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [shift, setShift] = useState<StudentShift>("Mañana");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const loadRecords = () => {
    setRecords(
      getInterviews().filter((interview) => interview.teacherId === currentUser?.id),
    );
  };

  useEffect(() => {
    loadRecords();
    const handleUpdate = () => loadRecords();
    window.addEventListener("interviewsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("interviewsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [currentUser?.id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!currentUser) {
      setMessage("No se encontró la sesión del profesor.");
      return;
    }

    if (!student.trim() || !course.trim() || !subject.trim() || !time || !reason.trim()) {
      setMessage("Completa todos los campos para registrar la entrevista.");
      return;
    }

    const studentId = getOrCreateStudent(student, course, shift);

    saveInterview({
      id: `interview-${Date.now()}`,
      studentId,
      studentName: student.trim(),
      course: course.trim(),
      shift,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      date: getToday(),
      time,
      subject: subject.trim(),
      reason: reason.trim(),
      status: "Pendiente",
    });

    setStudent("");
    setCourse("");
    setShift("Mañana");
    setSubject("");
    setTime("");
    setReason("");
    setMessage("✓ Entrevista guardada correctamente.");
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
              <input type="text" value={student} onChange={(event) => setStudent(event.target.value)} placeholder="Nombre completo del estudiante" required />
            </label>
            <label>
              <span>Curso</span>
              <input type="text" value={course} onChange={(event) => setCourse(event.target.value)} placeholder="Ej. 5.º de Secundaria" required />
            </label>
            <label>
              <span>Turno</span>
              <select value={shift} onChange={(event) => setShift(event.target.value as StudentShift)}>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </label>
            <label>
              <span>Materia</span>
              <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Materia de la entrevista" required />
            </label>
            <label>
              <span>Hora</span>
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
            </label>
            <label className="form-field--full">
              <span>Motivo</span>
              <textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Escribe el motivo de la entrevista" rows={4} required />
            </label>
          </div>

          {message && <p className="professor-form-message" role="status">{message}</p>}
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
            {records.length === 0 ? (
              <p className="empty-records">Todavía no tienes entrevistas registradas.</p>
            ) : (
              records.map((record) => (
                <article className="interview-record" key={record.id}>
                  <div className="record-topline">
                    <span className="record-student">{record.studentName}</span>
                    <span className={`record-status record-status--${record.status.toLowerCase()}`}>{record.status}</span>
                  </div>
                  <p className="record-course">{record.course} · {record.shift}</p>
                  <div className="record-details">
                    <span><strong>Materia:</strong> {record.subject}</span>
                    <span><strong>Fecha:</strong> {record.date}</span>
                    <span><strong>Hora:</strong> {record.time}</span>
                    <span><strong>Motivo:</strong> {record.reason}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default ProfessorDashboard;
