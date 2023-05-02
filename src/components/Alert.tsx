import { IconAlertCircle, IconSquareRoundedMinus } from "@tabler/icons-react"

function Alert({ alert, setAlert }: { alert: string, setAlert: React.Dispatch<React.SetStateAction<string>> }): JSX.Element {
  return (
    <div className="alert alert-error shadow-lg">
      <div className="grid grid-cols-3 gap-3 place-content-between w-full">
        <IconAlertCircle />
        <span>Error! {alert}</span>
        <button
          className="justify-self-end"
          onClick={() => {
            setAlert("")
          }}
        ><IconSquareRoundedMinus /></button>
      </div>
    </div>
  )
}

export default Alert
