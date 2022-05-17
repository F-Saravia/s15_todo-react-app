/**
 * Ce fichier contient l'intégralité de nos cmoposasnts stylisés.
 * Vous trouverez TOUT le css de l'application
 */

//import de styled component
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body,html{
        margin: 0;
        padding: 0;
        font-family: 'Nunito', sans-serif;
    }
    h1{
        font-family: 'Lobster', sans-serif;
    }
`;

export const MyParagraph = styled.p`
  text-align: center;
  color: red;
`;
