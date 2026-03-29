import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarGroupCountExample({ person }: { person: string }) {
  const changePersonType = Number(person);
  const threePerson = Array.from({
    length: changePersonType > 3 ? 3 : changePersonType,
  });
  const restPerson = changePersonType - 3;
  return (
    <AvatarGroup>
      {threePerson.map((_, i) => (
        <Avatar key={i}>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      ))}

      {restPerson > 0 && (
        <Avatar>
          <AvatarGroupCount>+{restPerson}</AvatarGroupCount>
        </Avatar>
      )}
    </AvatarGroup>
  );
}
