import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-top: -7rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.5rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 2rem;

      &.deposit {
        color: var(--green);
      }
      &.withdraw {
        color: var(--red);
      }
    }
    &.highlight-background {
      background: var(--green);
      color: #fff;
    }
  }

  @media only screen and (min-width: 768px) {
    /* For everything bigger than 768px */
    grid-template-columns: repeat(3, 1fr);
  }
`;
