import { createRoot } from 'react-dom/client';
import { DiagramStudio } from '@benmacha/doctrine-diagram';

function SchemaPage() {
  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <DiagramStudio
        apiUrl="https://api.example.com/diagram"
        headers={() => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })}
        onEntitySelect={(entity) => console.log(entity)}
      />
    </div>
  );
}

createRoot(document.getElementById('app')!).render(<SchemaPage />);
