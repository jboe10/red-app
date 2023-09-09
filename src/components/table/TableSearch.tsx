import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TableSearch({ setSearch }: any) {
	const searchFieldOnChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.preventDefault();
		setSearch(e.target.value);
	};
	return (
		<Box sx={{ '& > :not(style)': { m: 1 } }}>
			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<TextField
					onChange={searchFieldOnChangeHandler}
					id="input-with-sx"
					label="Orderer Name"
					variant="standard"
				/>
			</Box>
		</Box>
	);
}
