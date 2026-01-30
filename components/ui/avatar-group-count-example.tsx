import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarGroupCountExample({ person }: { person: number }) {
  const threePerson = Array.from({ length: person > 3 ? 3 : person });
  const restPerson = person - 3;
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
