import styled from 'styled-components/macro';

export const NavBarWrapper = styled.div`
  font-size: 20px;
  margin: 20px;
  background-color: #d75d77;
  border: 5px solid pink;

  & ul {
    & li {
      display: inline-block;
      margin-right: 1em;

      & a {
        color: white;
        text-decoration: none;
      }
    }
  }
`;

export const OneRemMarginWrapper = styled.div`
  margin: 1rem;
`;

