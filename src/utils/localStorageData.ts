import type { UserRecord, UserRole } from "../types/auth";
import usersData from "../data/users.json";

export type StudentShift = "Mañana" | "Tarde";
export type InterviewStatus = "Realizado" | "Pendiente" | "Cancelado";

export interface StudentRecord {
  id: string;
  name: string;
  lastName: string;
  secondLastName: string;
  course: string;
  shift: StudentShift;
}

export interface InterviewRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  shift: StudentShift;
  teacherId: string;
  teacherName: string;
  date: string;
  time: string;
  subject: string;
  reason: string;
  status: InterviewStatus;
}

const STORAGE_KEYS = {
  users: "app_users",
  students: "app_students",
  interviews: "app_interviews",
} as const;

const demoUsers = usersData as UserRecord[];

const demoStudents: StudentRecord[] = [
  {
    id: "student-1",
    name: "Juan",
    lastName: "Pérez",
    secondLastName: "Mamani",
    course: "5.º de Secundaria",
    shift: "Mañana",
  },
  {
    id: "student-2",
    name: "Sofía",
    lastName: "Arce",
    secondLastName: "Flores",
    course: "4.º de Secundaria",
    shift: "Tarde",
  },
];

const demoInterviews: InterviewRecord[] = [
  {
    id: "interview-1",
    studentId: "student-1",
    studentName: "Juan Pérez Mamani",
    course: "5.º de Secundaria",
    shift: "Mañana",
    teacherId: "user-2",
    teacherName: "Erik Palacios",
    date: "2026-09-08",
    time: "10:30",
    subject: "Matemática",
    reason: "Seguimiento académico",
    status: "Pendiente",
  },
];

function readArray<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (error) {
    console.error(`Error al leer ${key}:`, error);
    return [];
  }
}

function writeArray<T>(key: string, value: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error al guardar ${key}:`, error);
  }
}

function ensureDemoUsers(): void {
  // La lista local se sincroniza con users.json para eliminar cuentas antiguas.
  writeArray(STORAGE_KEYS.users, demoUsers);
}

export function initializeLocalData(): void {
  ensureDemoUsers();

  if (!localStorage.getItem(STORAGE_KEYS.students)) {
    writeArray(STORAGE_KEYS.students, demoStudents);
  }

  if (!localStorage.getItem(STORAGE_KEYS.interviews)) {
    writeArray(STORAGE_KEYS.interviews, demoInterviews);
  }
}

export function getUsers(): UserRecord[] {
  initializeLocalData();
  return readArray<UserRecord>(STORAGE_KEYS.users);
}

export function getStudents(): StudentRecord[] {
  initializeLocalData();
  return readArray<StudentRecord>(STORAGE_KEYS.students);
}

export function getInterviews(): InterviewRecord[] {
  initializeLocalData();
  return readArray<InterviewRecord>(STORAGE_KEYS.interviews);
}

export function saveInterview(interview: InterviewRecord): void {
  const interviews = getInterviews();
  writeArray(STORAGE_KEYS.interviews, [...interviews, interview]);
  window.dispatchEvent(new Event("interviewsUpdated"));
}

export function updateInterviewStatus(
  interviewId: string,
  status: InterviewStatus,
): void {
  const updated = getInterviews().map((interview) =>
    interview.id === interviewId ? { ...interview, status } : interview,
  );

  writeArray(STORAGE_KEYS.interviews, updated);
  window.dispatchEvent(new Event("interviewsUpdated"));
}

export function saveStudent(student: StudentRecord): void {
  const students = getStudents();
  writeArray(STORAGE_KEYS.students, [...students, student]);
}

export function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export { STORAGE_KEYS };
export type { UserRole };
