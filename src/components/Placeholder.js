import styled from "styled-components";
import React from 'react'

const Placeholder2 = styled.img`
display: flex;
align-items: center;
justify-content: center
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

export const Placeholder = ({ src }) => {
    return (
        <Placeholder2 src={src} />
    )
}
