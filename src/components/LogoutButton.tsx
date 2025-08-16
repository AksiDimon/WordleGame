import IconLogout from "./icons/IconLogout";

 type Props = {
    onClick: VoidFunction
}
export function LogoutButton({onClick}:Props) {
  return (
    <button
      onClick={onClick}
      className="btn btn-danger cursor-pointer"
      title="Выйти из аккаунта"
    >
      <IconLogout className="w-4 h-4" />
      Выйти
    </button>
  );
}
