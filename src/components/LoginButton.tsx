import IconLogin from "./icons/IconLogin";

type Props = {
    onClick: VoidFunction
} 

export function LoginButton({ onClick }:Props ) {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary cursor-pointer"
      title="Войти через Google"
    >
      <IconLogin className="w-4 h-4" />
      Войти
    </button>
  );
}
