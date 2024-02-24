import { InputLabel } from "@mui/material";
import { ISelectOption } from "../../interface/common";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  options: ISelectOption[]
  className?: string
  isSearchable?: boolean | false
  onChange?: (selected: ISelectOption | null) => void
  defaultValue?: ISelectOption
  placeHolder?: string
}

const SelectOption: React.FC<Props> = ({ defaultValue, options, onChange, isSearchable, className }) => {
  const handleChange = (event: SelectChangeEvent<ISelectOption>) => {
    onChange?.(event.target.value as ISelectOption); 
  };

  return (
    <>
      <Select
        value={defaultValue}
        onChange={handleChange}
        style={{ width: '200px', color: 'black' }} 
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

    </>

  )
}

export default SelectOption;