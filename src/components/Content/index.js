import React from 'react';
import styled from 'styled-components';

// Utilisation de styled-components avec transient props ($) pour éviter de transmettre des props au DOM natif
const Container = styled.div.attrs(({ $geometry, $style }) => ({
  style: {
    position: 'absolute',
    background: 'red',
    left: `${$geometry?.x || 0}%`,
    top: `${($geometry?.y || 0) + ($geometry?.height || 0)}%`,
    ...$style,
  },
}))`
  background: white;
  border-radius: 2px;
  box-shadow: 
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  margin-top: 8px;
  margin-left: 8px;
`;

function Content({ annotation, style = {}, className = '' }) {
  console.log('Rendering content for annotation:', annotation);

  // Vérifie si l'annotation contient la géométrie
  const { geometry } = annotation;
  if (!geometry) return null;

  return (
    <Container
      $geometry={geometry} // Transient prop pour éviter son transfert dans le DOM natif
      $style={style}       // Permet de personnaliser dynamiquement le style via des props
      className={className}
    >
      {/* Contenu de l'annotation */}
      {annotation.data?.text || 'Label manquant'}
    </Container>
  );
}

export default Content;
