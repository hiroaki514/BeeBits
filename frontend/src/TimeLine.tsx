import styled from 'styled-components'

const Button = styled.button`
  background-color: blue;
`
const Title = styled.p`
  color: red;
`

function TimeLine() {

  return (
    <>
      <Title>TimeLine.tsx</Title>
      <Button>ボタン</Button>
    </>
  )
}

export default TimeLine
