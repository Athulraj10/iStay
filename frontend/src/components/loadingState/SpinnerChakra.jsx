import { Stack, Spinner} from "@chakra-ui/react";
export const SpinnerChakra = () => {
  return (
    <Stack style={{ display: "flex",alignItems:"center",justifyContent:'center',height:'90vh' }} direction="row" spacing={4}>
    <Spinner
      thickness="4px"
      speed="0.15s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Stack>
  )
}

// export default SpinnerChakra