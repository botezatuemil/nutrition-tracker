import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { editWaterGoal, addWater } from "../../actions/waterAction";
import { CalendarIcon } from "@chakra-ui/icons";

const ModalOption: React.FC<{
  title: string;
  setShowGoal: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}> = (props) => {
  const [liters, setLiters] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  const dipatch = useAppDispatch();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLiters(parseFloat(event.currentTarget.value));
  };

  const onSave = () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    if (props.show) {
      dipatch(editWaterGoal(liters, headers));
    } else {
      dipatch(addWater(liters, date, headers));
    }
    props.setShowGoal(false);
  };

  return (
    <div className="absolute z-10 p-8  -translate-x-1/2 flex flex-col justify-between   -translate-y-1/2 left-1/2 top-1/2 backdrop-blur-md shadow-lg w-[30vw] rounded-xl bg-white h-[16rem]">
      <p className="font-Jakarta font-semibold text-lg">{props.title}</p>
      <div className="mt-5 flex flex-col space-y-2  ">
        <p>{props.show ? "Edit goal" : "Add a new drink"}</p>
        <Input
          type="number"
          placeholder={
            props.show
              ? "Edit the current water goal in liters"
              : "Add liters of water consumed"
          }
          onChange={onChangeHandler}
        />
        {!props.show && (
          <InputGroup width={{ md: "14vw" }}>
          <InputLeftElement
            pointerEvents="none"
            children={<CalendarIcon color="gray.300" />}
          />
          <Input
            backgroundColor="white"
            type="date"
            placeholder="Enter date"
            onChange={(e) => setDate(new Date(e.currentTarget.value))}
          />
        </InputGroup>
        )}
      </div>
      <div className="place-self-end space-x-2">
        <Button variant="ghost" onClick={() => props.setShowGoal(false)}>
          Cancel
        </Button>
        <Button colorScheme="messenger" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ModalOption;
