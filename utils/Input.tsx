import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps  } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?:string;
  mask?: string | Array<(string | RegExp)>
}

export default function Input({name, label, ...rest}: InputProps){
  return(
    <FormControl>
    { label && <FormLabel style={{ margin: 0 }} htmlFor={name}>{label}</FormLabel>}
    <ChakraInput
      name={name}
      type={name}
      id="email"
      focusBorderColor="blue.200"
      bgColor="gray.900"
      variant="filled"
      _hover={{
        bgColor: 'gray.900'
      }}
      size="lg"
      {...rest}
    />
  </FormControl>
  )
}