import styled from "styled-components/macro";

export const MainWrapper = styled.div`
  padding-top: 10vh;
`;

export const CheckboxInputWrapper = styled.div`
  margin-bottom: 10px;
`;

export const FormWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 5vh;
`;

export const NavBarWrapper = styled.div`
  font-size: 20px;
  font-family: arial;
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

// .nav-bar ul li a {
//     text-decoration: none;
//     color: white;
// }
