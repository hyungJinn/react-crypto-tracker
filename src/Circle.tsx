import styled from "styled-components";

interface CircleProps {
  bgColor: string;
}

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

// const x = (a: number, b: number) => a + b;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

// function Circle({ props }: CircleProps) {
//   return <Container bgColor={props.bgColor} />;
// }

export default Circle;
