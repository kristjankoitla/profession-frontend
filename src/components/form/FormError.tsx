export interface FormErrorProps {
  text: string;
}

export default function FormError(props: FormErrorProps) {
  return (
    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
      {props.text}
    </span>
  );
}
