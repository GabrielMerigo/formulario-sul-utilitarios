import { FormControl, FormLabel, Textarea as TextareaInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface TextareaProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export default function Textarea({ name, label, ...rest }: TextareaProps) {
  return (
    <FormControl mt={2}>
      {label && <FormLabel style={{ margin: 0 }} htmlFor={name}>{label}</FormLabel>}
      <TextareaInput
        name={name}
        type={name}
        id="descriptionVehicle"
        focusBorderColor="blue.200"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
      />
    </FormControl>
  )
}