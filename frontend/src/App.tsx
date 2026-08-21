import { useStudents } from './hooks/useStudents';

export default function App() {
  const { students, loading, error } = useStudents();

  if (loading) return <p>Chargement des étudiants...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des Étudiants</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName} - {student.email} ({student.age} ans)
          </li>
        ))}
      </ul>
    </div>
  );
}