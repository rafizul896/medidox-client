import { getInputFieldError } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";
import { IErrInputField } from "../../../types";

const FieldValidationError  = ({
  fieldName,
  state,
}: {
  fieldName: string;
  state: { errors: IErrInputField[] };
}) => {
  return (
    <>
      {getInputFieldError(fieldName, state) && (
        <FieldDescription className="text-red-600">
          {getInputFieldError(fieldName, state)}
        </FieldDescription>
      )}
    </>
  );
};

export default FieldValidationError ;
