import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OrderType } from '../api/OrderApi';

export default function DropDown({
	value,
	setValue,
	hasAllOption = false,
}: any) {
	const handleChange = (event: SelectChangeEvent) => {
		setValue(event.target.value);
	};

	return (
		<FormControl
			sx={{
				width: '150px',
			}}
		>
			<InputLabel id="demo-simple-select-label">Order Type</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				label="Order Type"
				onChange={handleChange}
			>
				{hasAllOption ? <MenuItem value={-1}>All</MenuItem> : null}
				<MenuItem value={OrderType.Standard}>Standard</MenuItem>
				<MenuItem value={OrderType.SaleOrder}>SaleOrder</MenuItem>
				<MenuItem value={OrderType.PurchaseOrder}>PurchaseOrder</MenuItem>
				<MenuItem value={OrderType.TransferOrder}>TransferOrder</MenuItem>
				<MenuItem value={OrderType.ReturnOrder}>ReturnOrder</MenuItem>
			</Select>
		</FormControl>
	);
}
