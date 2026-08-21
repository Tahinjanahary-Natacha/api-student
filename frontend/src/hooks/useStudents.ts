import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

export interface Student {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  age: number;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchApi<Student[]>('/students');
      setStudents(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      const newStudent = await fetchApi<Student>('/students', {
        method: 'POST',
        body: JSON.stringify(studentData),
      });
      setStudents((prev) => [...prev, newStudent]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return { students, loading, error, addStudent, refreshStudents: loadStudents };
}