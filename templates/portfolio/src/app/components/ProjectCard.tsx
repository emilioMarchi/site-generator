import React from 'react';

export const ProjectCard: React.FC<{ title: string; description?: string; }> = ({ title, description }) => {
  return (
    <article style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {description && <p>{description}</p>}
    </article>
  );
};
