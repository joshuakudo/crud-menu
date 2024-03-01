import { InputLabel } from "@mui/material";
import { ISelectOption } from "../../interface/common";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  options: ISelectOption[]
  onChange?: (selectedOption: ISelectOption | null) => void;
  selectOption?: ISelectOption
  setSelectOption?: React.Dispatch<React.SetStateAction<ISelectOption >>
  defaultValue?: string
  placeHolder?: string
}

const SelectOption: React.FC<Props> = ({ defaultValue, options, onChange, setSelectOption, selectOption }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    const selectedOption = options.find(option => option.value === selectedValue) || null;
    setSelectOption!(selectedOption!);
  };

  return (
    <>
      <Select
        key={selectOption?.key}
        value={selectOption ? selectOption.value : 'All'}
        onChange={handleChange}
        style={{ width: '200px', color: 'black' }} 
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

    </>

  )
}

export default SelectOption;