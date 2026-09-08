import type { UserRecord, UserRole } from "../types/auth";

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

const demoUsers: UserRecord[] = [
  {
    id: "user-1",
    name: "María Fernández",
    username: "maria.fernandez",
    password: "demo123",
    role: "SECRETARIA_INFORMACIONES",
  },
  {
    id: "user-2",
    name: "Carlos Pérez",
    username: "carlos.perez",
    password: "demo123",
    role: "PROFESOR",
  },
  {
    id: "user-3",
    name: "Administrador",
    username: "admin",
    password: "admin123",
    role: "ADMIN",
  },
];

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
    teacherName: "Carlos Pérez",
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
  const storedUsers = readArray<UserRecord>(STORAGE_KEYS.users);
  const users = [...storedUsers];

  for (const demoUser of demoUsers) {
    const index = users.findIndex(
      (user) => user.username?.trim().toLowerCase() === demoUser.username.toLowerCase(),
    );

    if (index === -1) {
      users.push(demoUser);
      continue;
    }

    const current = users[index];
    users[index] = {
      ...demoUser,
      ...current,
      id: current.id || demoUser.id,
      name: current.name || demoUser.name,
      username: current.username || demoUser.username,
      password: demoUser.password,
      role: current.role || demoUser.role,
    };
  }

  writeArray(STORAGE_KEYS.users, users);
}

export function initializeLocalData(): void {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    writeArray(STORAGE_KEYS.users, demoUsers);
  } else {
    // Repair users left behind by older versions of the frontend.
    ensureDemoUsers();
  }

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
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export { STORAGE_KEYS };
export type { UserRole };
