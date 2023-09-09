import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import DropDown from './DropDown';
import { update } from '../api/OrderApi';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function EditOrderModal({ open, setOpen, rowData = null }: any) {
	const [customerName, setCustomerName] = React.useState('');
	const [createdByUsername, setCreatedByUsername] = React.useState('');
	const handleClose = () => setOpen(false);
	const [orderType, setOrderType] = React.useState(4);

	React.useEffect(() => {
		if (rowData !== null) {
			setOrderType(rowData.type);
		}
	}, [rowData]);

	const formSubmitHandler = async (e: any) => {
		e.preventDefault();
		setOpen(false);
		await update({
			...rowData,
			customerName: customerName !== '' ? customerName : rowData?.customerName,
			createdByUserName:
				createdByUsername !== ''
					? createdByUsername
					: rowData?.createdByUsername,
			type: orderType,
		});
	};

	const customerNameChangeHandler = (e: any) => {
		setCustomerName(e.target.value);
	};
	const createdByUsernameChangeHandler = (e: any) => {
		setCreatedByUsername(e.target.value);
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
						onSubmit={formSubmitHandler}
					>
						<Box sx={{ display: 'flex', marginBottom: '2rem' }}>
							<TextField
								sx={{
									width: '100%',
								}}
								onChange={customerNameChangeHandler}
								id="standard-basic"
								label={'Customer Name'}
								variant="standard"
							/>
							<Box
								sx={{ color: 'black', marginTop: 'auto', marginLeft: '.5rem' }}
							>
								{rowData?.customerName}
							</Box>
						</Box>
						<Box sx={{ display: 'flex', marginBottom: '2rem' }}>
							<TextField
								sx={{
									width: '100%',
								}}
								onChange={createdByUsernameChangeHandler}
								id="standard-basic1"
								label={'Created By Username'}
								variant="standard"
							/>
							<Box
								sx={{
									color: 'black',
									marginTop: 'auto',
									marginLeft: '.5rem',
								}}
							>
								{rowData?.createdByUsername}
							</Box>
						</Box>
						<Box>
							<DropDown value={orderType} setValue={setOrderType} />
						</Box>
						<Button
							variant="contained"
							sx={{ backgroundColor: '#DB3534', marginTop: '2rem' }}
							type="submit"
						>
							Update
						</Button>
					</form>
				</Box>
			</Modal>
		</div>
	);
}
