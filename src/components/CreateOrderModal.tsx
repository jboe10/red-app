import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Add from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import DropDown from './DropDown';
import { create } from '../api/OrderApi';
import { CreateOrderContext } from '../App';

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

export default function CreateOrderModal() {
	const { currentOrderContext, setCurrentOrderContext } =
		React.useContext(CreateOrderContext);
	const [open, setOpen] = React.useState(false);
	const [customerName, setCustomerName] = React.useState('');
	const [createdByUsername, setCreatedByUsername] = React.useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [orderType, setOrderType] = React.useState(0);

	const saveDraftClickHandler = (e: any) => {
		setCurrentOrderContext({ customerName, createdByUsername, orderType });
	};

	React.useEffect(() => {
		if (currentOrderContext !== undefined) {
			setCreatedByUsername(currentOrderContext.createdByUserName);
			setCustomerName(currentOrderContext.customerName);
			setOrderType(currentOrderContext.orderType);
		}
	}, [open, currentOrderContext]);

	const formSubmitHandler = async (e: any) => {
		e.preventDefault();
		const result = await create({
			customerName,
			createdByUsername,
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
		<>
			<Button
				variant="contained"
				sx={{ backgroundColor: '#DB3534' }}
				onClick={handleOpen}
			>
				<Add />
			</Button>
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
						<TextField
							sx={{ marginBottom: '1rem' }}
							onChange={customerNameChangeHandler}
							id="standard-basic"
							label="Customer Name"
							variant="standard"
						/>
						<TextField
							sx={{ marginBottom: '2rem' }}
							onChange={createdByUsernameChangeHandler}
							id="standard-basic1"
							label="Created By User"
							variant="standard"
						/>
						<DropDown value={orderType} setValue={setOrderType} />
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '2rem',
							}}
						>
							<Button
								variant="contained"
								sx={{ backgroundColor: '#DB3534' }}
								type="submit"
							>
								Create
							</Button>
							<Button
								variant="contained"
								sx={{ backgroundColor: '#DB3534' }}
								onClick={saveDraftClickHandler}
							>
								SaveDraft
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</>
	);
}
