interface Props {
  name: string;
  avatar?: string;
}

function UserCard({ avatar, name }: Props) {
  const avatarText = name.charAt(0).toUpperCase();

  return (
    <div>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="h-14 w-14 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
          {avatarText}
        </div>
      )}
    </div>
  );
}

export default UserCard;
