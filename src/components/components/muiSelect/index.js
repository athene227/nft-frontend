import Select, { SelectChangeEvent } from '@mui/material/Select';
import SelectCustomWrapper from './styled';

const CustomSelect = () =>{
    const [selectCollection, setselectCollection] = React.useState('');

    const handleChanges = (event: SelectChangeEvent) => {
        setselectCollection(event.target.value as string);
    };
    return(
        <SelectCustomWrapper>
            <div className="form-control-select">
            <FormControl fullWidth className="">
            <Select
            value={age}
            onChange={handleChanges}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>
                <img src={CollectionImg} />
                Ten
            </MenuItem>
            <MenuItem value={20}>
                <img src={CollectionImg} />
                Twenty
            </MenuItem>
            <MenuItem value={30}>
                <img src={CollectionImg} />
                Thirty
            </MenuItem>
            </Select>
      </FormControl>
    </div>
        </SelectCustomWrapper>
    );
    
}
export default CustomSelect;

