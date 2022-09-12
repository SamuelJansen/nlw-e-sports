interface ButtonProps {
  title: string
}

const Button = (props: ButtonProps) => {
  return (
    <button
      style={{
        display: "flex",
        border: "none",
        margin: "1px 0",
        backgroundColor: "green"
      }}
    >
      {props.title}
    </button>
  )
}

const App = () => {
  return (
    <>
      <Button title="Send 1" />
      <Button title="Send 2" />
      <Button title="Send 3" />
    </>
  )
}

export default App
