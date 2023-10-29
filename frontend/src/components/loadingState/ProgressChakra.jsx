import { Progress } from "@chakra-ui/react";

export const ProgressChakra = () => {
  return (
    <div style={{background:"black"}}>
      <Progress size="xl" style={{ background:"#112239",height: "100vh" }} isIndeterminate />
    </div>
  );
};
